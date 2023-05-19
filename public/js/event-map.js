let myMap

function initViewMarkers() {
    initMap()
    getEventsJSON()
}

function initMap() {
    myMap = new google.maps.Map(
        document.querySelector('#map'),
        { zoom: 12, center: { lat: 40.392521370648154, lng: - 3.6989879718518366 }, }
    )
}

function getEventsJSON() {
    fetch(`/api/locations`)
        .then(res => res.json())
        .then(eventsJSON => renderEventsMarkers(eventsJSON))
        .catch(err => console.log(err))
}

function renderEventMarker(eventData) {
    const eventCoords = {
        lat: eventData.location.coordinates[1],
        lng: eventData.location.coordinates[0]
    };
    new google.maps.Marker({
        map: myMap,
        position: eventCoords,
        title: eventData.name
    });
}

initViewMarkers()