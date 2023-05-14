const router = require("express").Router()

const User = require('../models/User.model')

// const { isLoggedIn, checkRoles, checkOwnership } = require('../middlewares/route-guard')

router.get("/", (req, res, next) => {

    // const userRole = {
    //     isAdmin: req.session.currentUser?.role === 'ADMIN'
    // }
    // const currentUserId = req.session.currentUser?._id

    User
        .find()
        .select({ username: 1 })
        .sort({ username: 1 })
        .then(users => {
            // users.forEach(user => {
            //     const pageUserId = user._id
            //     if (currentUserId == pageUserId) {
            //         user.isOwner = true
            //     } else {
            //         user.isOwner = false
            //     }
            //     if (user.isOwner || userRole.isPM) {
            //         user.canEdit = true
            //     } else {
            //         user.canEdit = false
            //     }
            // })
            res.render("users/member-list", { users })
            // res.render("users/member-list", { users, userRole, currentUserId })
        })
        .catch(err => console.log('---> user error', err))
})

module.exports = router
