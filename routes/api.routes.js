const express = require('express')
const router = express.Router()
const watchmodeApiHandler = require('../services/watchmode-api.service')

router.get("/api/movies", (req, res, next) => {
    const { title } = req.query;

    watchmodeApiHandler
        .getAutocompleteTitle(title)
        .then(response => res.json(response.data))
        .catch(err => next(err));
});

module.exports = router