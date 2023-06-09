const express = require('express')
const router = express.Router()
const uploaderMiddleware = require('../middlewares/uploader.middleware')
const bcrypt = require('bcryptjs')
const saltRounds = 10

const User = require('./../models/User.model')
const { isLoggedOut } = require('../middlewares/route-guard')

router.get('/register', isLoggedOut, (req, res, next) => {
    res.render('auth/sign-up')
})

router.post("/register", uploaderMiddleware.single('avatar'), (req, res, next) => {

    const { path: avatar } = req.file
    const { username, email, plainPassword } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(plainPassword, salt))
        .then(hashedPassword => User.create({ username, email, password: hashedPassword, avatar }))
        .then(() => res.redirect('/log-in'))
        .catch(err => next(err))
})

router.get('/log-in', isLoggedOut, (req, res, next) => {
    res.render('auth/log-in')
})

router.post("/log-in", (req, res, next) => {

    const { email, password } = req.body

    if (email.length === 0 || password.length === 0) {
        res.render('auth/log-in', { errorMessage: 'Los campos son obligatorios' })
        return
    }

    User
        .findOne({ email })
        .then(foundUser => {

            if (!foundUser) {
                res.render('auth/log-in', { errorMessage: 'Usuario no reconocido' })
                return
            }

            if (!bcrypt.compareSync(password, foundUser.password)) {
                res.render('auth/log-in', { errorMessage: 'Contraseña incorrecta' })
                return
            }

            req.session.currentUser = foundUser // login!
            res.redirect('/')
        })
})

router.get('/log-out', (req, res, next) => {
    req.session.destroy(() => res.redirect('/'))
})

module.exports = router