require("dotenv").config();
require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();

require("./config")(app);
require("./config/session.config")(app) // session config

const capitalize = require("./utils/capitalize");
const projectName = "Project-2";

app.locals.appTitle = `${capitalize(projectName)} created by Cris and Ignacio`;

app.use((req, res, next) => {
    app.locals.loggedUser = req.session.currentUser
    app.locals.loggedAdmin = req.session.currentUser?.role === 'ADMIN'
    next()
})

const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/users", userRoutes);

const eventRoutes = require("./routes/event.routes");
app.use("/events", eventRoutes);

const authRoutes = require('./routes/auth.routes')
app.use('/', authRoutes)

const movieRoutes = require('./routes/movie.routes')
app.use('/', movieRoutes)

const apiRoutes = require('./routes/api.routes')
app.use('/', apiRoutes)

const mapRoutes = require('./routes/map.routes')
app.use('/', mapRoutes)

require("./error-handling")(app);

module.exports = app;
