let myMap
const eventId = document.querySelector('#eventId').value


function initViewMarkers() {
    initMap()
    getEventsJSON(eventId)
}

function initMap() {
    myMap = new google.maps.Map(
        document.querySelector('#map'),
        { zoom: 12, center: { lat: 40.392521370648154, lng: - 3.6989879718518366 }, }
    )
}

function getEventsJSON(eventId) {
    fetch(`/api/locations/${eventId}`)
        .then(res => res.json())
        .then(eventsJSON => renderEventMarkers(eventsJSON))
        .catch(err => console.log(err))
}

function renderEventMarkers(eventData) {
    const eventCoords = {
        lat: eventData.location.coordinates[0],
        lng: eventData.location.coordinates[1]
    }

    new google.maps.Marker({
        map: myMap,
        position: eventCoords,
        title: eventData.name
    })
}

initViewMarkers()