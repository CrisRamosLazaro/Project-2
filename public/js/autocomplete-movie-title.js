document.querySelector('#movieTitleAutocomplete').onkeyup = event => {

    const { value } = event.target

    document.querySelector('#suggestionResults').innerHTML = ''

    axios
        .get(`/api/movies?title=${value}`)
        .then(movies => printSuggestions(movies.data.results))
        .catch(err => console.log(err))
}

function printSuggestions(movies) {

    let code = ``

    movies.forEach(elm => {
        code += `<li><a href="/movie-search-results/${elm.id}">${elm.name}</a></li>`
    })

    document.querySelector('#suggestionResults').innerHTML += code
}