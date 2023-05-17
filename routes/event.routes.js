const express = require('express')
const router = express.Router()
const Event = require('../models/Event.model')

router.get("/list", (req, res, next) => {

    Event
        .find()
        .select({ name: 1 })
        .sort({ name: 1 })
        .then(events => res.render('events/event-list', { events }))
        .catch(err => console.log(err))
})
router.get('/create', (req, res, next) => {
    res.render('events/event-creator')
})

router.post("/create", (req, res, next) => {

    const { name, eventImg, date, timeStart: start, timeEnd: end, description, tickets } = req.body
    // console.log(location, lat, lng)

    Event
        .create({ name, eventImg, date, time: { start, end }, description, tickets })
        .then(() => res.redirect('/events/list'))
        .catch(err => console.log(err))
})
module.exports = router