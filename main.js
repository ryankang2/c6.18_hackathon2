$(document).ready(initializeApp);

let foodInput = null;

function initializeApp () {
    addClickHandler;
}

function addClickHandler () {
    $(".submit").click(submitClicked);
}

function submitClicked () {
    retrieveInput();
    location.href = "www.yoursite.com"
}

function retrieveInput () {
    foodInput = $("#foodInput").value();
}