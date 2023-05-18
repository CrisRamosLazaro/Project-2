const express = require('express');
const router = express.Router();
const watchmodeApiHandler = require('../services/watchmode-api.service');
const User = require('../models/User.model');


router.post("/:titleId", (req, res, next) => {

    const { value } = req.params

    watchmodeApiHandler
        .getAutocompleteTitle(value)
        .then(response => {
            res.render('movies/movie-search-results', { movie: response.data })
        })
        .catch(err => next(err))
})

router.post("/:titleId/like", (req, res, next) => {
    const { titleId } = req.params
    const { _id: userId } = req.session.currentUser
    let movie

    watchmodeApiHandler
        .getOneTitle(titleId)
        .then(response => {
            movie = { apiId: titleId, title: response.data.title }
            return movie
        })
        .then(() => {
            User
                .findByIdAndUpdate(userId, { $push: { favMovies: movie } }, { new: true })
                .then(user => {
                    req.session.currentUser = user
                    req.session.save(err => {
                        if (err) {
                            next(err);
                        } else {
                            res.redirect(`/users/profile/${userId}`)
                        }
                    })
                })
                .catch(err => next(err))
        })
})

router.get("/:titleId", (req, res, next) => {

    const { titleId } = req.params

    watchmodeApiHandler
        .getOneTitle(titleId)
        .then(response => {
            res.render('movies/movie-search-results', response.data)
        })
        .catch(err => next(err))

})



module.exports = router
