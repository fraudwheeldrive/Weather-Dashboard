var apiKey="50cfed0850e8c63f7eeaf90f41755e61"; // OWM APi key
var button = document.querySelector('#search-btn');
var inputValue = document.querySelector('#search-city');
var placeName = document.querySelector('.name');
var desc = document.querySelector('desc');
var temp = document.querySelector('.temp');
var cityPrint = document.querySelector(".city-results")
var celcius = "metric";



// get information for user input city

function citySearch(event) {
  event.preventDefault();
  console.log("click");
  var cityName = inputValue.value;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${celcius}&appid=${apiKey}`)
  
  .then(function(response) { 
    response.json() 
   
    .then(function(data) {
      console.log(data);
      cityCoord(city,data);
    });

 //need error handling
  });
};

function cityCoord ()

// get weather data for city 
//button.addEventListener("click", function(){
  


button.addEventListener("click", citySearch);


 //var long 
 //var lat 

 //call one call in fuction (daily stuff)
//catch(err => alert("wrong city name"))

//data.coord.lon //  
//variable "" 
// need to pass data 
// 


//getCurrentWeather();