const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.render('auth/log-in', { errorMessage: 'Inicia sesión para continuar' })
}

const isLoggedOut = (req, res, next) => {
    !req.session.currentUser ? next() : res.redirect('/')
}

const checkRoles = (...admittedRoles) => (req, res, next) => {

    const isAdmitted = admittedRoles.includes(req.session.currentUser.role)

    if (isAdmitted) {
        next()
    } else {
        res.render('auth/log-in', { errorMessage: 'Acceso no autorizado' })
    }
}

const checkUser = (req, res, next) => {

    const { _id } = req.params
    if (req.session.currentUser.role === "ADMIN" || req.session.currentUser._id === _id) {
        next()
    } else {
        res.render('auth/log-in', { errorMessage: 'Acceso no autorizado' })
    }
}

module.exports = { isLoggedIn, isLoggedOut, checkRoles, checkUser }