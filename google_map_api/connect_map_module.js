let marker;
function initMap() {
    let map = new google.maps.Map(document.getElementById('googleMap'), {
        center: new google.maps.LatLng(42.87909718755642, 74.5953816175461),
        zoom: 16,
        mapTypeControl: false,
        streetViewControl: false
    });

    let geocoder = new google.maps.Geocoder();

    map.addListener('click', function(e) {
        geocodeAddress(e.latLng, map);
    });

    document.getElementById('submit').addEventListener('click', function() {
        geocodeAddress(geocoder, map);
    });

    // Google Maps API - автозаполнение поисковика
    let input = /** @type {!HTMLInputElement} */(
        document.getElementById('address'));

    let autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    // Google Maps API - добавление события подсказки геолокации пользователя
    let infoWindow = new google.maps.InfoWindow( {
        map: map
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let contentString = "<h2 style='color: maroon;'>Askartech</h2>";
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            let infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            let homeMarker = new google.maps.Marker({
                position: pos,
                map: map
            });
            homeMarker.addListener('click', function() {
                infowindow.open(map, homeMarker);
            });
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function geocodeAddress(geocoder, resultsMap) {
    let address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            if (marker == null) {
                resultsMap.setCenter(results[0].geometry.location);
                marker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location,
                    animation: google.maps.Animation.DROP
                });
            } else {
                marker.setPosition(geocoder, resultsMap);
            }

        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}
