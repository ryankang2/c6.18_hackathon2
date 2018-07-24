// $(document).ready(initializeApp);

/**
 * @param  {keywordOfAddress, location}
 * @return {list of resturants}
 * Function that pulls yelp API with keyword/address search and current location (city)
 */
function requestYelpData (keywordOrAddress = irvine, location = irvine) {
    debugger;
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