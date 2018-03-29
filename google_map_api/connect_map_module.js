/*function myMap() {
    let marker;
    let clickedElement = document.getElementById('clicked_element');
    // Google Maps API - прорисовка карты
    let mapProp = {
        center: new google.maps.LatLng(42.87909718755642, 74.5953816175461),
        zoom: 16,
        mapTypeControl: false,
        streetViewControl: false
    };
    let map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

    // Google Maps API - добавление и перемещение маркера при клике
    map.addListener('click', function(event) {
        addMarker(event.latLng);
        clickedElement.innerHTML = 'карту, координаты ' + event.latLng;
    });
    addMarker(mapProp);

    function addMarker(location) {
        if (marker == null) {
            marker = new google.maps.Marker({
                position: location,
                animation: google.maps.Animation.DROP,
                map: map
            });
        } else {
            marker.setPosition(location);
        }
    }

    // Google Maps API - добавление события подсказки геолокации пользователя
    let infoWindow = new google.maps.InfoWindow( {
        map: map
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Вы тут!');
            map.setCenter(pos);
            map.data.add({ geometry: new google.maps.Data.Polygon(pos)});
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    let geocoder = new google.maps.Geocoder;

    document.getElementById('submit').addEventListener('click', function() {
        geocodeLatLng(geocoder, map, infoWindow);
    });
}

function geocodeLatLng(geocoder, map, infoWindow) {
    geocoder.geocode({'placeId': map.latLng}, function(results, status) {
        if (status === 'OK') {
            if (results[0]) {
                map.setZoom(11);
                map.setCenter(results[0].geometry.location);
                infowindow.setContent(results[0].formatted_address);
                infowindow.open(map, marker);
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}*/
function initMap() {
    let map = new google.maps.Map(document.getElementById('googleMap'), {
        center: new google.maps.LatLng(42.87909718755642, 74.5953816175461),
        zoom: 16,
        mapTypeControl: false,
        streetViewControl: false
    });

    let geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function() {
        geocodeAddress(geocoder, map);
    });

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
            resultsMap.setCenter(results[0].geometry.location);
            let marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
                animation: google.maps.Animation.DROP
            });
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
