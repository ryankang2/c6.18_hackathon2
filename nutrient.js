$(document).ready(initializeApp);

function initializeApp(){
    $('#foodBtn').click(nutritionCallFromServer);
}

function nutritionCallFromServer(){
    let userQuery = $('#foodInput').val();
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
            $('.test').append(img);

            let servingQuantity = response.foods[0].serving_qty;
            let servingWeight = response.foods[0].serving_weight_grams;
            let calories = response.foods[0].nf_calories;
            let totalFat = response.foods[0].nf_total_fat;
            let sugars = response.foods[0].nf_sugars;
            let protein = response.foods[0].nf_protein;
        },
        error: function(){
            console.log('error');
        }
    }

    $.ajax(options);
}