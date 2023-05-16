document.querySelector('#movieTitleAutocomplete').onkeyup = event => {

    const { value } = event.target

    document.querySelector('#suggestionResults').innerHTML = ''

    axios
        .get(`/api/movies?title=${value}`)
        .then(movies => printSuggestions(movies.data.results))
        .catch(err => console.log(err))
}

function printSuggestions(movies) {

    movies.forEach(elm => {

        console.log('ESTA PELI ES ', elm.name, 'Y SU ID ES', elm.id)
        document.querySelector('#suggestionResults').innerHTML +=
            `<li><a href="/movie-search-results/${elm.id}">${elm.name}</a></li>`
    })
}