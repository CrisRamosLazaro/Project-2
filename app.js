require("dotenv").config();
require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();

require("./config")(app);

const capitalize = require("./utils/capitalize");
const projectName = "Project-2";

app.locals.appTitle = `${capitalize(projectName)} created by Cris and Ignacio`;

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);
const userRoutes = require("./routes/user.routes");
app.use("/members", userRoutes);
const eventRoutes = require("./routes/event.routes");
app.use("/events", eventRoutes);

require("./error-handling")(app);

module.exports = app;
