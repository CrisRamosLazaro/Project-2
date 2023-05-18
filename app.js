require("dotenv").config()
require("./db")
const { getUserRole } = require('./utils/role-handling')

const express = require("express");
const app = express();



require("./config")(app);
require("./config/session.config")(app) // session config

app.locals.appTitle = `Project 2`;

app.use((req, res, next) => {
    app.locals.loggedUser = req.session.currentUser
    app.locals.loggedAdmin = req.session.currentUser?.role === 'ADMIN'
    next()
})

require('./routes/index')(app)

require("./error-handling")(app)

module.exports = app;
