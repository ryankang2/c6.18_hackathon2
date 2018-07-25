var infoWindow;

var origin = {lat: -33.8688, lng: 151.2195};
var map;


$(document).ready(applyClickHandler);

/**
 * Apply click handler to FindMore button
 */
function applyClickHandler(){
  $("#findMore").click(showMap);
}

function showMap(){
  $("#pic").hide();
  $("#map").show();
}



function initAutocomplete() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: origin,
        zoom: 13,
        mapTypeId: 'roadmap'
    });

    infoWindow = new google.maps.InfoWindow;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // var clickHandler = new ClickEventHandler(map, pos);

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are Here');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the 

        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            console.log(place);
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),// 17 34
                scaledSize: new google.maps.Size(25, 25)
            };

            var infoWindow = new google.maps.InfoWindow({
                content: `${place.name} <br> Rating: ${place.rating} `,
                pixelOffset: new google.maps.Size(0, 0)
            });

            var markerLocation = new google.maps.Marker({
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
                title: place.name,
                position: place.geometry.location
            });

            markerLocation.addListener('click', function() {
                console.log( "PLACE:  " ,place )
                debugger;
                infoWindow.open(map, markerLocation);
                // break the address up into street address , cit
                const arrayOfString = place.formatted_address.split(',');
                console.log(arrayOfString);
                const address = arrayOfString[0];
                const cityName = arrayOfString[1];
                const name = place.name;
                // send sudip lat and long
                
                requestYelpData(name , address, cityName);
                displayRoute("9200 Irvine Center Dr, Irvine CA", place.formatted_address);
                testClick(place.formatted_address);
            });

            // Create a marker for each place.
            markers.push(markerLocation);

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}


function displayRoute(origin, destination) {
    var service = new google.maps.DirectionsService;
    var display = new google.maps.DirectionsRenderer({
        draggable: true,
        map: map,
        panel: document.getElementById('right-panel')
    });
    service.route({
        origin: origin,
        destination: destination,
        // waypoints: [{location: 'Adelaide, SA'}, {location: 'Broken Hill, NSW'}],
        travelMode: 'DRIVING',
        avoidTolls: true
    }, function(response, status) {
        if (status === 'OK') {
            display.setDirections(response);
        } else {
            alert('Could not display directions due to: ' + status);
        }
    });
}

function computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    document.getElementById('total').innerHTML = total + ' km';
}


function populateAddressInfo( string ) {
    const arrayOfString = string.split(',');
    console.log(arrayOfString);
    let address


}

function testClick(addr){
    console.log('From test click:', addr);
}

function requestYelpData (keywordOrAddress = irvine,) {
    debugger;
    let key = {
        api_key: "XSyryzoREYThrY1P0pDAkbK9uJV0j7TVklsKegO9g9aqqqGz87SZPuhQ0Cob0jzZ6G1BCVE9JaycPHyB2OI7hXgTJYs_enS7SKr1G21Jf45cDBYbUAHOFnh-r3FWW3Yx",
        term: keywordOrAddress,
        //location: location
    }
    let yelpAPI = {
        data: key,
        url: "https://yelp.ongandy.com/businesses",
        method: "POST",
        dataType: "json",
        success: function (response) {
            console.log(response)
        },
        error: function () {
            console.log("fail")
        }
    }
    $.ajax(yelpAPI)
}

