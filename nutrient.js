$(document).ready(initializeApp);

var food = sessionStorage.getItem("setFood");
console.log("food Item: ", food);

function initializeApp(){
    nutritionCallFromServer();
}


function nutritionCallFromServer(){
    console.log("called");
   let userQuery = food
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
    //    url: 'https://maps.google.com/maps/contrib/115173066447171785733/photos',
       headers: dataForServer,
       data: {
           'query': userQuery
       },
       method: 'post',
       success: function(response) {
           console.log(response);
           let src = response.foods[0].photo.highres;
           let img = $('<img>').attr('src', src);
           
           $('#pic').html(img);
           storeNutritionToDOM(response.foods[0])
       },
       error: function(error){
           console.log('error: ', error);
           return false;
       }
   }
   $.ajax(options);
}


function storeNutritionToDOM (foodObj) {
   $(".serving").text(foodObj.serving_qty);
   $(".unit").text(foodObj.serving_unit);
   $(".calories").text(foodObj.nf_calories + " kcal");
   $(".carbohydrate").text(foodObj.nf_total_carbohydrate + " g");
   $(".protein").text(foodObj.nf_protein + " g");
   $(".fat").text(foodObj.nf_total_fat + " g");
   $(".sugar").text(foodObj.nf_sugars + " g");
   $(".sodium").text(foodObj.nf_sodium + " mg");
   $(".cholesterol").text(foodObj.nf_cholesterol + " mg");
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