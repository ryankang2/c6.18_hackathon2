$(document).ready(initApp);

function initApp(){
    $("#search").click(handleSearch);
    console.log("init");
}

function handleSearch(){
    let search = $("#foodInput").val();
    console.log("input food: ", search);
    console.log("clicked");
}
