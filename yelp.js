// $(document).ready(initializeApp);
// let foodItem = sessionStorage.setFood;
let foodItem = "taco";
let yelpResponse = null;
    

/**
 * @param  {keywordOfAddress, location}
 * @return {list of resturants}
 * Function that pulls yelp API with keyword/address search and current location (city)
 */

function requestYelpData (keywordOrAddress = "chicken", location = "irvine") {
    let key = {
        api_key: "8omc0Yh_VpsNVtwSesxDrxKYNBTjSx4unT_tUQKxv7FpvWGn9QmAhpI2XlvNHaN3NDrwdY2UahjFHb5Qu6KhuzlLFQ04LzbCJT1BocPCAAiMEJpovT3fWX4IoKtXW3Yx",
        term: keywordOrAddress,
        location: location
    }
    let yelpAPI = {
        data: key,
        url: "https://api.yelp.com/v3/businesses/search",
        method: "POST",
        dataType: "json",
        success: function (response) {
            console.log(response);
            yelpResponse = response
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

requestYelpData();