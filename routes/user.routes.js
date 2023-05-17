const router = require("express").Router()
const User = require('../models/User.model')
const { isLoggedIn, checkRoles } = require('../middlewares/route-guard')
const uploaderMiddleware = require('../middlewares/uploader.middleware')

// User profile
router.get('/profile', isLoggedIn, (req, res, next) => {
    res.render('users/profile', { user: req.session.currentUser })
})

// List of all users seen by the ADMIN
router.get("/list", isLoggedIn, checkRoles('ADMIN'), (req, res, next) => {

    const userRole = {
        isAdmin: req.session.currentUser?.role === 'ADMIN',
    }

    User
        .find()
        .select({ username: 1 })
        .sort({ username: 1 })
        .then(users => res.render("admin/list-user-page", { users, userRole }))
        .catch(err => next(err))
})

// Information of specific user
router.get('/details/:_id', (req, res, next) => {

    const { _id } = req.params

    User
        .findById(_id)
        .then(user => res.render('users/details', user))
        .catch(err => next(err))
})

// edit user form (render) - PROTECTED
router.get('/edit/:_id', (req, res, next) => {

    const { _id } = req.params

    User
        .findById(_id)
        .then(user => res.render('admin/edit-page', user))
        .catch(err => next(err))
})

// edit user form (handler) - PROTECTED
router.post('/edit/:_id', uploaderMiddleware.single('avatar'), (req, res, next) => {


    const { username, email, description } = req.body
    const { _id } = req.params

    if (req.file) {
        const { path: avatar } = req.file
        User
            .findByIdAndUpdate(_id, { username, email, description, avatar })
            // .then(user => res.send(user))
            .then(() => res.redirect(`/users/details/${_id}`))
            .catch(err => next(err))
    } else {
        User
            .findByIdAndUpdate(_id, { username, email, description })
            // .then(user => res.send(user))
            .then(() => res.redirect(`/users/details/${_id}`))
            .catch(err => next(err))
    }
})





// delete book (de tipo POST!!!!) - PROTECTED
router.post('/delete/:_id', (req, res, next) => {

    const { _id } = req.params

    User
        .findByIdAndDelete(_id)
        .then(() => res.redirect(`/users/list`))
        .catch(err => next(err))
})

module.exports = router
