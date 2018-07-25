// $(document).ready(initializeApp);
// let foodItem = sessionStorage.setFood;
    let foodItem = "taco";
    let yelpResponse = null;
    
/**
 * @param  {keywordOfAddress, location}
 * @return {list of resturants}
 * Function that pulls yelp API with keyword/address search and current location (city)
 */

function requestYelpData (name, address, city) {
    let customUrl = "https://yelp.ongandy.com/businesses/matches";
    let key = {
        api_key: "9bPpnQ55-8I0jLR62WqbyvBAv20IJ-zF-WJs7YJgLqZeRqokQg2L995TrDHKUVXEmRblz6We2EMClsxkS4vbfmRLLP5G1cPcV5FFX0fzSi388ha6a1qsHR5J97dWW3Yx",
        name: name,
        address1: address,
        city: city,
        state: "CA",
        country: "US",
      }
    let yelpAPI = {
        data: key,
        url: customUrl,
        method: "POST",
        dataType: "json",
        success: function (response) {
            console.log("success", response);
            var businessId= response.businesses[0].id;
            getYelpDetails(businessId);
        },
        error: function () {
            console.log("fail")
        }

    }
    $.ajax(yelpAPI)
}

function getYelpDetails (id) {
    debugger;
    let customUrl = "https://yelp.ongandy.com/businesses/details";
    let key = {
        api_key: "9bPpnQ55-8I0jLR62WqbyvBAv20IJ-zF-WJs7YJgLqZeRqokQg2L995TrDHKUVXEmRblz6We2EMClsxkS4vbfmRLLP5G1cPcV5FFX0fzSi388ha6a1qsHR5J97dWW3Yx",
        id: id,
      }
    let yelpAPI = {
        data: key,
        url: customUrl,
        method: "POST",
        dataType: "json",
        success: function (response) {
            console.log("Business Detail   :", response);
        },
        error: function () {
            console.log("fail")
        }
    }
    $.ajax(yelpAPI)
}

/**
 * @param  {} object response from yelp api
 * Function the displays the data to dom dynamically
 */
function createYelpDisplay(object) {
    
}