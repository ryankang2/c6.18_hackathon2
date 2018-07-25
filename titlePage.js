$(document).ready(initializeApp);

let foodInput = null;

/**
 * @param {}
 */
function initializeApp () {
    addClickHandler();
}

$(function() {
    $('input.autocomplete').autocomplete({
        // can ajax nutri api for list, but unable too
      data: {
        "Apple": null,
        "Chicken": null,
        "Taco": null,
        "Wings": null,
        "Burritos": null,
        "Cake": null,
        "Rice": null,
        "Pizza": null,
        "Curry": null,
        "Orange": null,
        "Beer": null,
        "Wine": null,
        "Burger": null,
        "Fish": null,
        "Ice Cream": null,
        "Strawberry": null,
        "Cheese": null,
        "Bread": null,
        "Chips": null,
        "Salsa": null,
      }
    });
});

/**
 * Applies click handler to the submit button
 */
function addClickHandler () {
    $(".submit").click(submitClicked);
}

/**
 * Once user presses submit, get input and change page
 */
function submitClicked () {
    retrieveInput();
    changePage();
}

/**
 *  Changes the page  
 */
function changePage () {
    // nutritionCallFromServer($("#food").val());

    location.assign("food.html")
}
/**
 * Will use session storage to get user
 * input
 */
function retrieveInput () {
    foodInput = $("#food").val();
    var food = sessionStorage;
    food.setFood = foodInput;
}