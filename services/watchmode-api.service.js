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

    getAutocompleteTitle(value) {
        return this.axiosApp.get(`autocomplete-search/?apiKey=${process.env.API_KEY}&search_value=${value}&search_type=2`)
    }

    getOneTitle(titleId) {
        return this.axiosApp.get(`/title/${titleId}/details/?apiKey=${process.env.API_KEY}&append_to_response=sources`)
    }

}

const watchmodeApiHandler = new WatchmodeApiHandler()

module.exports = watchmodeApiHandler