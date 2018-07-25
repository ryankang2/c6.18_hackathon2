$(document).ready(initializeApp);

var food = sessionStorage.getItem("setFood");

/**
 * Once DOM is ready, get nutrition from server and add animations
 * to submit and reset button
 */
function initializeApp(){
    $(".submit").addClass("scale-in");
    $("#reset").addClass("scale-in");
    nutritionCallFromServer();
}


function nutritionCallFromServer(){
   let userQuery = food
   let dataForServer = {
       "Content-Type": "application/x-www-form-urlencoded",
       "x-app-id": "aade7b14",
       "x-app-key": "1113d90b4e2c7c93807a9d95916321c4",
       "x-remote-user-id": "0",
       "Cache-Control": "no-cache",
       "query": 'apple',
   };
   let options = {
       dataType: 'json',
       url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
       headers: dataForServer,
       data: {
           'query': userQuery
       },
       method: 'post',
       success: function(response) {
           let src = response.foods[0].photo.highres;
           let img = $('<img>').attr('src', src);
           
           $('#pic').html(img);
           storeNutritionToDOM(response.foods[0])
       },
       error: function(error){
           if (error.statusText === "Not Found") {
               alert("Couldn't find " + food + "! Press Ok to go back to home screen");
               location.assign("index.html");
               sessionStorage("setFood", "");
           }
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