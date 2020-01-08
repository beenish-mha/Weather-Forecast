//assigning weatherapi
var $currentTemp = $("#current-temp");
var $currentCity = $("#current-city");
//var $forecastDiv = $(".row-cols-md-2");
var queryUrl;
var $city;
var $cityListArray = JSON.parse(localStorage.getItem("city")) || [];
//var storeCities=JSON.parse(localStorage.getItem("city"))
//console.log(storeCities)

//making list of already searched cities
if  ($cityListArray !== [])  {
for (var j = 0; j<$cityListArray.length; j++){
   $("#city-list").append($("<h5>").text($cityListArray[j]));
}
}

// making cities list and store in local storage 
//and displaying on the left side of the page
function cityList(){
    $cityListArray.push($city);
     window.localStorage.setItem("city", JSON.stringify($cityListArray));
     $("#city-list").append($("<h5>").text($city));    
}

//getting city name on click event
$(".btn").on("click", function(){ 
    var $cityName = $("#city-name").val();
    $("#city-name").val("");
    //console.log($cityName)
    queryUrl = "http://api.weatherapi.com/v1/forecast.json?key=28b5b18116344d0ba6e131451190812&days=6&q="+$cityName;
results();
});


//calling ajax function
function results(){
$.ajax ({ 
    url : queryUrl,
    method : "GET"
}) .then (function(response) {
  console.log(response)
  $("#current-temp").empty();
  $("#forecast-div").empty();
  
  // getting the city and country name
  $city=response.location.name;
  $currentTemp.append($("<h3>").text(response.location.name + " "+ response.location.country + " ("+response.forecast.forecastday[0].date+")"));
 
  // $currentTemp.append($("<img>").attr("src",  response.current.condition.icon));

  //setting <h5> html tag and assigning response parameters
  $currentTemp.append($("<h5>").text("Current Temperature: " + response.current.temp_c + "C"));
  $currentTemp.append($("<h5>").text("Humidity: " + response.current.humidity + "%"));
  $currentTemp.append($("<h5>").text("Wind Speed: " + response.current.wind_mph + "MPH"));
  $currentTemp.append($("<h5>").text("UV Index: " + response.current.uv));

  //setting forcast for 5 days 
  $(".row-cols-md-2").append("<div").attr("class", "mb-4")
  $(".mb-4").append($("<div>").attr("class", "card"));
  $(".card").append($("<div>").attr("class", "card-body"));
  for (var i=1; i<response.forecast.forecastday.length; i++){    
      $(".card-body").append($("<h5>").attr("class","card-title").text(response.forecast.forecastday[i].date)); 
      $(".card-body").append($("<p>").attr("class","card-text").text("Temperature: " + response.forecast.forecastday[i].day.maxtemp_c + "C"));  
      $(".card-body").append($("<p>").attr("class","card-text").text("Humidity: " + response.forecast.forecastday[i].day.avghumidity + "%"));  
  }
   
  cityList()
});

}
// .attr("class", "card-title")
// .attr("class", "card-text")