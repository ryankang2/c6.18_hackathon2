$(document).ready(initializeApp);

var food = sessionStorage.getItem("setFood");
console.log("food Item: ", food);

function initializeApp(){
<<<<<<< HEAD
    //nutritionCallFromServer();
=======
    $('#foodBtn').click(nutritionCallFromServer);
>>>>>>> 6c65947453c1ab8570076d3dd7f654004ec36c7a
}

function nutritionCallFromServer(){
    let userQuery = food;
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
            debugger;
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
            img.css({
                "height": "100%",
                 "width": "100%"
            })
            $('#pic').html(img);

            storeNutritionToDOM(response.foods[0])

        },
        error: function(){
            console.log('error');
        }
    }
    $.ajax(options);
}

function storeNutritionToDOM (foodObj) {
    $(".serving").text(foodObj.serving_qty + " " + foodObj.serving_unit);
    $(".unit").text(foodObj.serving_unit);
    $(".calories").text(foodObj.nf_calories + " kcal");
    $(".carbohydrate").text(foodObj.nf_total_carbohydrate + " g");
    $(".protein").text(foodObj.nf_protein + " g");
    $(".fat").text(foodObj.nf_total_fat + " g");
    $(".sugar").text(foodObj.nf_sugars + " g");
    $(".sodium").text(foodObj.nf_sodium + " mg");
    $(".cholesterol").text(foodObj.nf_cholesterol + " mg");
}