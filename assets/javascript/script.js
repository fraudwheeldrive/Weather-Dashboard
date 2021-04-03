var apiKey="50cfed0850e8c63f7eeaf90f41755e61"; // OWM APi key




//API call for weather. 
var getCurrentWeather = function() {
  fetch("https://api.openweathermap.org/data/2.5/onecall?lat={33.441792}&lon={94.037689&}&exclude={part}&appid=&{apiKey}")
};

getCurrentWeather();