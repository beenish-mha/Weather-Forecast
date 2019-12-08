var queryUrl = "http://api.weatherapi.com/v1/current.json?key=28b5b18116344d0ba6e131451190812&q=London"
$.ajax ({
    url : queryUrl,
    method : "GET"
}) . then (function(response) {
console.log(response)
});