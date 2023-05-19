const express = require('express')
const router = express.Router()
const watchmodeApiHandler = require('../services/watchmode-api.service')
const Event = require('../models/Event.model')


router.get('/movies', (req, res, next) => {

    const { title } = req.query

    watchmodeApiHandler
        .getAutocompleteTitle(title)
        .then(response => res.json(response.data))
        .catch(err => res.status(500).json({ message: 'Server API error', err }))
})

router.get('/locations/:eventId', (req, res, next) => {

    const { eventId } = req.params

    Event
        .findById(eventId)
        .then(event => {
            res.json(event)
        })
        .catch(err => console.log(err))
})

module.exports = router