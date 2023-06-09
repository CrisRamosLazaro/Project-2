const express = require('express')
const router = express.Router()
const Event = require('../models/Event.model')
const User = require('../models/User.model')
const { formatDate } = require('../utils/date-utils')
const { isLoggedIn, checkRoles, isLoggedOut } = require('../middlewares/route-guard')

router.get('/create', isLoggedIn, checkRoles('ADMIN'), (req, res, next) => {

    res.render('events/event-creator')
})

router.post("/create", (req, res, next) => {

    const { name, eventImg, date, timeStart: start, timeEnd: end, lng, lat, locationName, description, tickets } = req.body

    const location = {
        type: 'Point',
        coordinates: [lng, lat],
        name: locationName
    }

    Event
        .create({ name, eventImg, date, time: { start, end }, location, description, tickets })
        .then(() => res.redirect('/events/list'))
        .catch(err => next(err))
})

router.get("/list", isLoggedIn, (req, res, next) => {
    Event
        .find()
        .sort({ date: 1 })
        .then(events => {
            const dateFormatEvents = events.map(event => {
                const formattedDate = formatDate(event.date)
                return {
                    ...event.toObject(),
                    date: formattedDate
                };
            });
            res.render('events/event-list', { dateFormatEvents })
        })
        .catch(err => next(err));
});

router.post("/:eventId/join", isLoggedIn, (req, res, next) => {
    const { eventId } = req.params
    const { _id: userId } = req.session.currentUser

    User
        .findByIdAndUpdate(userId, { $addToSet: { myEvents: eventId } })
        .then(() => {
            return Event
                .findByIdAndUpdate(eventId, { $addToSet: { participants: userId } })
        })
        .then(() => res.redirect(`/users/profile`))
        .catch(err => next(err))
})

router.get('/:eventId', isLoggedIn, (req, res, next) => {

    const { eventId } = req.params

    Event
        .findById(eventId)
        .then(event => {
            const formattedDate = formatDate(event.date)
            const eventData = {
                ...event.toObject(),
                date: formattedDate
            }
            res.render('events/event-page', { event: eventData })
        })
        .catch(err => console.log(err))
})

module.exports = router