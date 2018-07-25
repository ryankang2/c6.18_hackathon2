$(document).ready(initializeApp);

let foodItem = sessionStorage.getItem("setFood");
console.log("food Item: ", foodItem);


function initializeApp(){
    nutritionCallFromServer();
}

function nutritionCallFromServer(){
    let userQuery = foodItem;
    let dataForServer = {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-app-id": "0657689d",
        "x-app-key": "1c577a065dc2109313e314fdb410b965",
        "x-remote-user-id": "0",
        "Cache-Control": "no-cache",
        "query": 'apple',
    }

    let options = {
        dataType: 'json',
        url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
        headers: dataForServer,
        data: {
            'query': userQuery
        },
        method: 'post',
        success: function(response) {
            console.log(response);
            let src = response.foods[0].photo.highres;
            let img = $('<img>').attr('src', src);
            img.css({
                "height": "100%",
                 "width": "100%"
            })
            $('#pic').html(img);
        },
        error: function(){
            console.log('error');
        }
    }

    $.ajax(options);
}