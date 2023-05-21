let myMap
const eventId = document.querySelector('#eventId').value


function initViewMarkers() {
    getEventsJSON(eventId)
        .then(eventsJSON => {
            const eventCoords = {
                lat: eventsJSON.location.coordinates[1],
                lng: eventsJSON.location.coordinates[0]
            }
            initMap(eventCoords)
            renderEventMarkers(eventsJSON)
        })
        .catch(err => console.log(err))
}

function initMap(center) {
    myMap = new google.maps.Map(
        document.querySelector('#map'),
        { zoom: 12, center: center }
    )
}

function getEventsJSON(eventId) {
    return fetch(`/api/locations/${eventId}`)
        .then(res => res.json())
        .catch(err => console.log(err))
}

function renderEventMarkers(eventData) {
    const eventCoords = {
        lat: eventData.location.coordinates[1],
        lng: eventData.location.coordinates[0]
    }

    new google.maps.Marker({
        map: myMap,
        position: eventCoords,
        title: eventData.name
    })
}

initViewMarkers()