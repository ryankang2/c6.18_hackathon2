// $(document).ready(initializeApp);

/**
 * @param  {keywordOfAddress, location}
 * @return {list of resturants}
 * Function that pulls yelp API with keyword/address search and current location (city)
 */
function requestYelpData (keywordOrAddress = irvine, location = irvine) {
    debugger;
    let key = {
        api_key: "8omc0Yh_VpsNVtwSesxDrxKYNBTjSx4unT_tUQKxv7FpvWGn9QmAhpI2XlvNHaN3NDrwdY2UahjFHb5Qu6KhuzlLFQ04LzbCJT1BocPCAAiMEJpovT3fWX4IoKtXW3Yx",
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