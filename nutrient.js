$(document).ready(initializeApp);

function initializeApp(){
    $('#food').click(nutritionCallFromServer);
}

function nutritionCallFromServer(){
    let userQuery = $('#foodInput').val();
    let dataForServer = {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-app-id": "d38bcc0d",
        "x-app-key": "dc38dfdff469218670a11fd10065d6cb",
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
            $('.test').append(img);
        },
        error: function(){
            console.log('error');
        }
    }

    $.ajax(options);
}