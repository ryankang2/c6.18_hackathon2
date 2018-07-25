$(document).ready(initializeApp);

var infoWindow;
var origin = {lat: 33.8688, lng: -117.2195};
let foodName = sessionStorage.getItem("setFood");
var map;
let previousInfoWindow = false;
let previousRoute = false;

function initializeApp() {
  applyClickHandler();
 
}


/**
 * Apply click handler to FindMore button
 */
function applyClickHandler(){
  $("#findMore").click(showMap);
  $("#reset").click(startOver);
  $("#logo").click(startOver);
  $("#pac-input").hide();
  $('#goThere').click(function(){
        $('#displayDirection').modal('show');
  });
}

function submitFormData () {

    var input = document.getElementById('pac-input');
    try {
        google.maps.event.trigger( input, 'focus');
    } finally {
        google.maps.event.trigger( input, 'keydown', {keyCode:13});
    }
}


/**
 * if user clicks button, hide the picture and show the map
 */
function showMap(){
  $("#pic").hide();
  $("#map").show();
  foodInput = sessionStorage.getItem("setFood");
  $("#pac-input").val(foodInput);
  setTimeout(submitFormData, 2000);
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
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are Here');
            infoWindow.open(map);
            map.setCenter(pos);
            previousInfoWindow = infoWindow;
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
            if (!place.geometry) {
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
                previousInfoWindow.close();
                infoWindow.open(map, markerLocation);
                previousInfoWindow = infoWindow;
                // break the address up into street address , cit
                const arrayOfString = place.formatted_address.split(',');
                const address = arrayOfString[0];
                const cityName = arrayOfString[1];
                const name = place.name;
                // send sudip lat and long
                
                requestYelpData(name , address, cityName);
                displayRoute("9200 Irvine Center Dr, Irvine CA", place.formatted_address);
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
        panel: document.getElementById('direction')
    });

    service.route({
        origin: origin,
        destination: destination,
        // waypoints: [{location: 'Adelaide, SA'}, {location: 'Broken Hill, NSW'}],
        travelMode: 'DRIVING',
        avoidTolls: true
    }, function(response, status) {
      
        if (status === 'OK') {
            if (previousRoute){
                previousRoute.setMap(null);
            }
            previousRoute = display;
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
}

/**
 * callback function. when user presses start over button or logo button, go
 * back to first screen
 */
function startOver(){ 
    location.assign("index.html");
    sessionStorage("setFood", "");
}