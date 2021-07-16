var apiKey="50cfed0850e8c63f7eeaf90f41755e61"; // OWM APi key
var apiUrl= `https://api.openweathermap.org/data/2.5/weather`
var units = "metric";
var saveCity = [];

$('#search-button').click(function(){
    $('.current-weather').empty();
    $('.forecast-container').empty();
    $('.search-history').empty();
    $('#error-display').empty();

    var location= $('#search-city').val().trim();
    var locationName = location[0].toUpperCase()+location.slice(1,location.length).toLowerCase();
    console.log(LocationName);
    currentWeather(LocationName);
});

//api call function 

function currentWeather(city) {

    fetch(apiUrl+`?q=${city}&units=${units}&appid=${apiKey}`)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);
        geoCoord(city,data);
    })
    .catch (function (error){
        $('error-display').text("No data for location entered")
    })
}

// create api call for weather 

function geoCoord(location, geoData) {
    console.log(location);
    var latitude = geoData.coord.lat;
    var longitude = geoData.coord.lon;

    var api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=${units}&exclude=minutely,hourly&appid=${apiKey}`

    fetch(api).then(function(response) {
        return response.json()
    })
    .then(function(data){
        console.log("uv",data);
        weatherDetails(location,data);
        fiveDay(location,data);
        searchHistory(location,latitude,longitude);
    })
    .catch (function(error){
        $("#error-display").text( "please refresh and try again");
    })

}

//display the weather. 