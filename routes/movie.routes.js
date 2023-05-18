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
    const { _id } = req.session.currentUser

    User
        .findByIdAndUpdate(_id, { $addToSet: { favMovies: titleId } }, { new: true })
        .then(updatedUser => {
            req.session.currentUser = updatedUser
        })
        .then(() => res.redirect('/users/profile'))
        .catch(err => next(err))

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
