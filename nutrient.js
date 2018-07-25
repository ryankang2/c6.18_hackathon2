$(document).ready(initializeApp);

let food = sessionStorage.getItem("setFood");


function initializeApp(){
    // nutritionCallFromServer();
}

function nutritionCallFromServer(){
    let userQuery = food;
    let dataForServer = {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-app-id": "ff571cbd",
        "x-app-key": "f4112a83315f79c5cdff346b54f08998",
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