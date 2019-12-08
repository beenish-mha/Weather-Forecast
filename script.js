//assigning weatherapi
var queryUrl = "http://api.weatherapi.com/v1/current.json?key=28b5b18116344d0ba6e131451190812&q=London"
var $currentTemp = $("#current-temp");

//calling ajax function
$.ajax ({
    url : queryUrl,
    method : "GET"
}) .then (function(response) {
  console.log(response)
  //setting <h5> html tag and assigning response parameters
  $currentTemp.append($("<h5>").text("Current Temperature: " + response.current.temp_c + "C"));
  $currentTemp.append($("<h5>").text("Humidity: " + response.current.humidity + "%"));
  $currentTemp.append($("<h5>").text("Wind Speed: " + response.current.wind_mph + "MPH"));
  $currentTemp.append($("<h5>").text("UV Index: " + response.current.uv));
});