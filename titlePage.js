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