// $('#search').on('input', () => {
//     const search = $('#search').val()
//     $.getJSON(`/autocomplete?search=${search}`, (data) => {
//         console.log(data);
//         $('#results').empty()
//         for (let prediction of data.predictions) {
//             $('#results').append(`<p>${prediction.description}</p>`)
//         }
//     })
// })

function initAutocomplete() {


    const input = document.getElementById('search')
    const autocomplete = new google.maps.places.Autocomplete(input)

    autocomplete.addListener('place_changed', () => {

        const place = autocomplete.getPlace()

        if (!place.geometry) {
            console.log("No details available for input: '" + place.name + "'");
            return;
        }

        // const lat = place.geometry.location.lat.toJSON()
        // const lng = place.geometry.location.lng()
        // const lat2 = place.geometry.location

        const coords = place.geometry.location

        const lat = Number
        const lng = Number


        document.getElementById('lat').value = lat;
        document.getElementById('lng').value = lng;

        console.log('cons-LOGGING2', typeof coords, coords)

    })
    console.log('console-LOGGING', typeof coords, coords)
}
