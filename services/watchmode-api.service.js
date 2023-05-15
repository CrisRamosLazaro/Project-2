const axios = require('axios')

class WatchmodeApiHandler {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: `https://api.watchmode.com/v1/`
        })
    }

    getAllTitles() {
        return this.axiosApp.get('/titles')
    }

    getOneTitle(titleId) {
        return this.axiosApp.get(`/title/${titleId}/details/?apiKey=${process.env.API_KEY}`)
    }

}

const watchmodeApiHandler = new WatchmodeApiHandler()

module.exports = watchmodeApiHandler