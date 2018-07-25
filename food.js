
let infoWindow;


let origin = {lat: 33.6348676, lng: -117.7405317};

$(document).ready(initializeApp);

let foodName = sessionStorage.getItem("setFood");

function initializeApp() {
  applyClickHandler();
}

let map;
let previousInfoWindow = false;
let previousRoute = false;

/**
 * Make a function applyClickHandlers 
 * @param { none };
 * @returns { none };
 * 
 * Apply click handler to the button with the if of findMore that runs the startOver function
 * Apply click handler to reset button and logo that runs the startOver function
 * Apply click handler to reset button that runs the startOver function
 * Populate the search bar with the storage variable foodName
 * Hide the search bar with the id of pac-input
 * Apply a click handler to the button with the id of goThere have it display the model on click
 */
function applyClickHandler(){
  $("#findMore").click(showMap);
  $("#reset").click(startOver);
  $("#logo").click(startOver);
  // need fix for foodname display
  $(".foodName").text(foodName);
  $("#pac-input").hide();
  $('#goThere').click(function(){
        $('#displayDirection').modal('show');
  });
}


/**
 * Make a function to autosubmit the input data
 * @param: { none };
 * @return: { none };
 * Target the searchbar with the id pac-input
 * focus on 
 * Trigger the input equivalent to the enter button
 */
function submitFormData () {
    let input = document.getElementById('pac-input');
    try {
        google.maps.event.trigger( input, 'focus');
    } finally {
        google.maps.event.trigger( input, 'keydown', {keyCode:13});
    }
}


/**
 * Make a function that hides the picture with an id of pic, shows the map
 * with an id of map. Store the session storage variable as a variable called 
 * if user clicks button, hide the picture and show the map
 * fill the search bar with the variabe foodInput
 * set a timeout to submit the form data after a short delay 1 second
 * @param: { none };
 * @returns: { none };
 */
function showMap(){
  $("#pic").hide();
  $("#map").show();
  foodInput = sessionStorage.getItem("setFood");
  $("#pac-input").val(foodInput);
  setTimeout(submitFormData, 1000);
}
/**
 * Make a function that creats a new google map attached to the div with the 
 * id of map, cet the center to the origin, zoom to 13, and mapTypeId to roadmap.
 */

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

    // Create the search box and link it to the search bar element with the id of pac-input.
    let input = document.getElementById('pac-input');
    let searchBox = new google.maps.places.SearchBox(input);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    let markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      let places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }
        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        let bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            // var icon = {
            //     url: place.icon,
            //     size: new google.maps.Size(71, 71),
            //     origin: new google.maps.Point(0, 0),
            //     anchor: new google.maps.Point(17, 34),
            //     scaledSize: new google.maps.Size(25, 25)
            // };

            let infoWindow = new google.maps.InfoWindow({
                content: `${place.name} <br> Rating: ${place.rating} `,
                pixelOffset: new google.maps.Size(0, 0)
            });
           

            let markerLocation = new google.maps.Marker({
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
                
                // send the relevant data to make the Yelp ajax call
                // send the relevant info to Google Directions
                requestYelpData(name , address, cityName);
                displayRoute("9200 Irvine Center Dr, Irvine CA", place.formatted_address);
            });

            // Create a marker for each place.
            markers.push(markerLocation);

            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}

function displayRoute(origin, destination) {
    let service = new google.maps.DirectionsService;
    let display = new google.maps.DirectionsRenderer({
        draggable: true,
        map: map,
        panel: document.getElementById('direction')
    });

    service.route({
        origin: origin,
        destination: destination,
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
    let total = 0;
    let myroute = result.routes[0];
    for (let i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    document.getElementById('total').innerHTML = total + ' km';
}


/**
 * callback function. when user presses start over button or logo button, go
 * back to first screen
 */
function startOver(){ 
    console.log("start over");
    location.assign("index.html");
    sessionStorage("setFood", "");
}