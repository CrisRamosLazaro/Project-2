const router = require("express").Router()
const Event = require('../models/Event.model')

router.get("/", (req, res, next) => {

    Event
        .find()
        .select({ name: 1, date: 1 })
        .sort({ date: 1 })
        .then(events => {

            res.render("events/event-list", { events })
        })
        .catch(err => console.log('---> user error', err))
})

// router.get("/create", (req, res, next) => {
//     const startTime = time.start
//     const { name, date, startTime, } = req.body;
//     Event.create({ name, date, })
//         .then(() => res.redirect('/'))
//         .catch(err => console.log('Error adding a new event:', err));

// })

module.exports = router