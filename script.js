//assigning weatherapi
var $currentTemp = $("#current-temp");
var $currentCity = $("#current-city");
var $forecastDiv = $("#forecast-div");
var queryUrl;

//getting city name on click event
$(".btn").on("click", function(){
    var $cityName = $("#city-name").val();
    $("#city-name").val("");
    console.log($cityName)
    queryUrl = "http://api.weatherapi.com/v1/forecast.json?key=28b5b18116344d0ba6e131451190812&days=6&q="+$cityName;
results();
})


//calling ajax function
function results(){
$.ajax ({ 
    url : queryUrl,
    method : "GET"
}) .then (function(response) {
  console.log(response)
  // getting the city and country name
  $currentTemp.append($("<h3>").text(response.location.name + " "+ response.location.country + " ("+response.location.localtime+")"));
 // $currentTemp.append($("<img>").attr("src",  response.current.condition.icon));
  
  //setting <h5> html tag and assigning response parameters
  $currentTemp.append($("<h5>").text("Current Temperature: " + response.current.temp_c + "C"));
  $currentTemp.append($("<h5>").text("Humidity: " + response.current.humidity + "%"));
  $currentTemp.append($("<h5>").text("Wind Speed: " + response.current.wind_mph + "MPH"));
  $currentTemp.append($("<h5>").text("UV Index: " + response.current.uv));
 
  //setting forcast for 5 days
  for (var i=0; i<5; i++){
    var $forcastColumn = $("<div>").attr("class", "col-2");
    $forecastDiv.append($forcastColumn);
      $(".col-2").append($("<h5>").text(response.forecast.forecastday[i].date)); 
      $(".col-2").append($("<p>").text("Current Temperature: " + response.forecast.forecastday[i].day.maxtemp_c + "C"));  
      $(".col-2").append($("<p>").text("Humidity: " + response.forecast.forecastday[i].day.avghumidity + "%"));  
  }
   

});
}
// .attr("class", "card-title")
// .attr("class", "card-text")