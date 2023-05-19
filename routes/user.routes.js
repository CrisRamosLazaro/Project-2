const router = require("express").Router()
const User = require('../models/User.model')
const { isLoggedIn, checkRoles, checkUser } = require('../middlewares/route-guard')
const uploaderMiddleware = require('../middlewares/uploader.middleware')
const { getUserRole } = require("../utils/role-handling")
const { response } = require("express")
const watchmodeApiHandler = require("../services/watchmode-api.service")

// User profile
router.get('/profile', isLoggedIn, (req, res, next) => {

    const userFavi = req.session.currentUser.favMovies

    const moviesPromises = userFavi.map(idMovies => watchmodeApiHandler.getOneTitle(idMovies))
    const userPromise = User
        .findById(req.session.currentUser._id)
        .populate('myEvents')

    Promise
        .all([...moviesPromises, userPromise])
        .then(values => {
            const movies = values.slice(0, -1)
            const userWithEvents = values[values.length - 1]


            const favMovies = movies.map(elm => elm.data)
            res.render('users/profile', { user: userWithEvents, favMovies })
        })
        .catch(err => next(err))
})



// List of all users seen by the ADMIN
router.get("/list", isLoggedIn, checkRoles('ADMIN'), (req, res, next) => {

    const userRole = getUserRole(req.session.currentUser)

    User
        .find()
        .select({ username: 1 })
        .sort({ username: 1 })
        .then(users => res.render("admin/list-user-page", { users, userRole }))
        .catch(err => next(err))
})

// Information of specific user
router.get('/details/:_id', checkRoles('ADMIN'), (req, res, next) => {

    const { _id } = req.params

    User
        .findById(_id)
        .populate('myEvents')
        .then(user => {
            res.render(`users/profile`, { user })
        })
        .catch(err => next(err))
})

// edit user form (render) 
router.get('/edit/:_id', checkUser, (req, res, next) => {

    const { _id } = req.params

    User
        .findById(_id)
        .then(user => res.render('admin/edit-page', user))
        .catch(err => next(err))
})

// edit user form (handler) 
router.post('/edit/:_id', checkUser, uploaderMiddleware.single('avatar'), (req, res, next) => {


    const { username, email, description } = req.body
    const { _id } = req.params

    User
        .findByIdAndUpdate(_id, { username, email, description, avatar: req.file?.path })
        .then(() => res.redirect(`/users/details/${_id}`))
        .catch(err => next(err))
})

// delete user - 
router.post('/delete/:_id', checkRoles('ADMIN'), (req, res, next) => {

    const { _id } = req.params

    User
        .findByIdAndDelete(_id)
        .then(() => res.redirect(`/users/list`))
        .catch(err => next(err))
})

module.exports = router
