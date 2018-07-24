
debugger;
var map;
// define an infowindow variable
var infowindow;

//waits for the input
function userInputForFood(){
  // var foodType = $('#autocomplete').val();
  $('#foodSearch').click(()=>initMap($('#autocomplete').val()));

}

// function called by the js script tag from google at the bottome of the html file
function initMap(foodType) {
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    // define variable object with keys of lat and long values need to be numbers
  var pyrmont = {lat: 33.6846, lng: -117.826};
// map is a new google map appended to the element with the id of map
  map = new google.maps.Map(document.getElementById('map'), {
    // set the center of the map
    center: pyrmont,
    // set zoom lower is zoom out higher is zoom in, 15-17 is recommended
    zoom: 15
  });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            var clickHandler = new ClickEventHandler(map, pos);

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // this is not implemented yet
        handleLocationError(false, infoWindow, map.getCenter());
    }

  service.nearbySearch({
    location: pyrmont,
    radius: 2000,
    type: foodType,
  }, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  
  google.maps.event.addListener(marker, 'click', function() {
      console.log(place);
    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
      'Place ID: ' + place.place_id + '<br>' + "Address: " +
      place.vicinity + '<br>' + "Price Level: " + place.price_level + '<br>' + "Rating: " + place.rating + '<br>' + "Open: " + place.opening_hours + '</div>');
    infowindow.open(map, this);
  });
}
