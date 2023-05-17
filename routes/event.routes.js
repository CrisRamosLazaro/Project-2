const express = require('express')
const router = express.Router()
const Event = require('../models/Event.model')

router.get("/list", (req, res, next) => {

    Event
        .find()
        .select({ name: 1 })
        .sort({ name: 1 })
        .then(events => res.render({ events }, 'events/event-list'))
        .catch(err => console.log(err))
})
router.get('/create', (req, res, next) => {
    res.render('events/event-creator')
})

router.post("/create", (req, res, next) => {

    const { name, eventImg, startDate, endDate, location, description, tickets } = req.body

    Event
        .create({ name, eventImg, startDate, endDate, location, description, tickets })
        .then(newEvent => res.redirect(newEvent, 'events/event-list'))
        .catch(err => console.log(err))
})
module.exports = router