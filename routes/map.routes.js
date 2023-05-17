const express = require('express')
const router = express.Router()
const axios = require('axios');


router.get('/autocomplete', async (req, res) => {
    const search = req.query.search;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${search}&key=${process.env.GOOGLE_API_KEY}`;

    try {
        const result = await axios.get(url);
        res.json(result.data);
    } catch (error) {
        res.json({ error: error.toString() });
    }
})

module.exports = router