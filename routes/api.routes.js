const express = require('express')
const router = express.Router()
const watchmodeApiHandler = require('../services/watchmode-api.service')

router.get("/movies", (req, res, next) => {

    const { title } = req.query;

    watchmodeApiHandler
        .getAutocompleteTitle(title)
        .then(response => res.json(response.data))
        .catch(err => res.status(500).json({ message: 'Server API error', err }))
});

module.exports = router