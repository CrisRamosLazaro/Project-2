const express = require('express');
const router = express.Router();
const watchmodeApiHandler = require('../services/watchmode-api.service');

router.post("/movie-search-results/:titleId", (req, res, next) => {

    const { titleId } = req.params

    watchmodeApiHandler
        .getOneTitle(titleId)
        .then(response => console.log('holaaaaa WTF', response.data)
            //     response => {
            //     console.log(response.data)
            //     res.render('movies/movie-search-results', { movie: response.data })
            // }
        )

        .catch(err => next('---> API error OH NOOOOO', err))

})



module.exports = router



