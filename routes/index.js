module.exports = app => {

    const indexRoutes = require("./index.routes");
    app.use("/", indexRoutes);

    const userRoutes = require("./user.routes");
    app.use("/users", userRoutes);

    const eventRoutes = require("./event.routes");
    app.use("/events", eventRoutes);

    const authRoutes = require('./auth.routes')
    app.use('/', authRoutes)

    const movieRoutes = require('./movie.routes')
    app.use('/movie-search-results', movieRoutes)

    const apiRoutes = require('./api.routes')
    app.use('/api', apiRoutes)

    const mapRoutes = require('./map.routes')
    app.use('/', mapRoutes)

}





