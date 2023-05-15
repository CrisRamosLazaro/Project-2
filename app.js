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

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/user", userRoutes);

const eventRoutes = require("./routes/event.routes");
app.use("/events", eventRoutes);

const authRoutes = require('./routes/auth.routes')
app.use('/', authRoutes)

require("./error-handling")(app);

module.exports = app;
