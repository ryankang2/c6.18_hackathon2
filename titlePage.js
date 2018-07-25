$(document).ready(initializeApp);

let foodInput = null;

/**
 * @param {}
 */
function initializeApp () {
    addClickHandler();
}

/**
 * @param  {}
 * @param  {}
 */
function addClickHandler () {
    $(".submit").click(submitClicked);
}

/**
 * @param  {}
 */
function submitClicked () {
    retrieveInput();
    changePage();
}

function changePage () {
    location.assign("food.html")
}

function retrieveInput () {
    foodInput = $("#food").val();
    var food = sessionStorage;
    food.setFood = foodInput;
}