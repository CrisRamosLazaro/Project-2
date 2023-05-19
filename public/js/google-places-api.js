function initAutocomplete() {

    const input = document.getElementById('search')
    const autocomplete = new google.maps.places.Autocomplete(input)

    autocomplete.addListener('place_changed', () => {

        const place = autocomplete.getPlace()

        if (!place.geometry) {
            console.log("No details available for input: '" + place.name + "'")
            return
        }

        const coords = place.geometry.location

        console.log(coords)

        const lat = coords.lat()
        const lng = coords.lng()
        const locationName = place.name

        document.getElementById('lat').value = lat
        document.getElementById('lng').value = lng
        document.getElementById('locationName').value = locationName

    })
}
