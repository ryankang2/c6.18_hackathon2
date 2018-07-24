// change googleIndex name
$(document).ready(food.html);

// var settings = {
//     "url": "https://yelp.ongandy.com/businesses",
//     "method": "POST",
//     "dataType": "JSON",
//     "data": {
//         term: "mexican",
//         location: "irvine", 
//         api_key: "XSyryzoREYThrY1P0pDAkbK9uJV0j7TVklsKegO9g9aqqqGz87SZPuhQ0Cob0jzZ6G1BCVE9JaycPHyB2OI7hXgTJYs_enS7SKr1G21Jf45cDBYbUAHOFnh-r3FWW3Yx"
//     },
//     success: function(response) {
//         console.log(response);
//     },
//     error: function(err) {
//         console.log(err);
//     }
// }

// $.ajax(settings).done(function (response) {
//     console.log(response);
// });

function requestYelpData (keywordOrAddress = irvine, location = irvine, latitude, longitude) {
    let key = {
        api_key: "XSyryzoREYThrY1P0pDAkbK9uJV0j7TVklsKegO9g9aqqqGz87SZPuhQ0Cob0jzZ6G1BCVE9JaycPHyB2OI7hXgTJYs_enS7SKr1G21Jf45cDBYbUAHOFnh-r3FWW3Yx",
        term: keywordOrAddress,
        location: location
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