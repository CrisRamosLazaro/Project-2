const express = require('express')
const router = express.Router()
const Event = require('../models/Event.model')

// event list
router.get("/list", (req, res, next) => {

    Event
        .find()
        .select({ name: 1 })
        .sort({ name: 1 })
        .then(events => res.render('events/event-list', { events }))
        .catch(err => console.log(err))
})
// new event form (render)
router.get('/create', (req, res, next) => {
    res.render('events/event-page')
})

router.post("/create", (req, res, next) => {

    const { name, eventImage, date, description } = req.body

    Event
        .create({ name, eventImage, date, description })
        .then(newEvent => res.redirect(`/event/list`, newEvent))
        .catch(err => console.log(err))
})
module.exports = router