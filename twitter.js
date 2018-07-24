$(document).ready(initApp);

let foodItem;

function initApp(){
    $("#search").click(handleSearch);
    console.log("init");
}
/**
 * assigns foodItem to user input
 */
function handleSearch(){
    foodItem = $("#foodInput").val();
    console.log("input food: ", foodItem);
    callToTwitter();
}

function callToTwitter(){
    var key = {
        consumer_key: "riPZu5DKlTJs12P046MgW9ISS",
        consumer_secret: "4Tng8znF1E0wNmxHeLS9NUBUmyJWDAqAl9pM9UeOzCAZFNHd1P",
        access_token_key: "1020388892527099904-qN5dlScwzgSHzjdja2dnVdHDUoftkg",
        access_token_secret: "gYP8XREQrD84U8WYJIpUMn1TQR3YPI4Tt6vHhd2OJsEXs",
    }
    var data ={
        q: foodItem,
    }
    var ajaxOptions = {
        type: "GET",
        dataType: "json",
        url: "https://api.twitter.com/1.1/search/tweets.json",
        data: key,
        success: function(){
            console.log("success");
        }
    }
    $.ajax(ajaxOptions);
}





