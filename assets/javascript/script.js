var apiKey = "50cfed0850e8c63f7eeaf90f41755e61"; // OWM APi key
var apiUrl = `https://api.openweathermap.org/data/2.5/weather`;
var units = "metric";
var saveCity = [];

$("#search-button").click(function () {
  $(".current-weather").empty();
  $(".forecast-container").empty();
  $(".search-history").empty();
  $("#error-display").empty();

  var location = $("#city-search").val().trim();
  var locationName =
    location[0].toUpperCase() +
    location.slice(1, location.length).toLowerCase();
  console.log(locationName);
  currentWeather(locationName);
});

//api call function

function currentWeather(city) {
  fetch(apiUrl + `?q=${city}&units=${units}&appid=${apiKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      geoCoord(city, data);
    })
    .catch(function (error) {
      $("error-display").text("No data for location entered");
    });
}

// create api call for weather

function geoCoord(location, geoData) {
  console.log(location);
  var latitude = geoData.coord.lat;
  var longitude = geoData.coord.lon;

  var api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=${units}&exclude=minutely,hourly&appid=${apiKey}`;

  fetch(api)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("uv", data);
      weatherDetails(location, data);
      fiveDay(location, data);
      searchHistory(location, latitude, longitude);
    })
    .catch(function (error) {
      $("#error-display").text("please refresh and try again");
    });
}

//display the weather.
function weatherDetails (city,info) {

    var unixTimeStamp =info.current.dt;
    var currentDate = dayjs.unix(unixTimeStamp).format("DD/MM/YYYY")
    console.log(currentDate);

    var uvIndex = info.current.uv;

    $("current-weather").append(

        `<div class="row name-image"></div>`
    )

    $(".name-image"). append (

        `
        <h4>${city}</h4>
        <img src="http://openweathermap.org/img/wn/${info.current.weather[0].icon}@2x.png>
        `
    )

    $(".current-weather").append(
        `
        <li>Date: ${currentDate} </li>
        <li>Temperature: ${info.current.temp}&#8451</li>
        <li>Humidity: ${info.current.humidity}%</li>
        <li>Wind Speed: ${info.current.wind_speed} MPH</li>
        <li>UV Index:${uvIndex}</li>`

        // <span id= "uv-color">/span>
        
    )

    // make uv color
    uvColor (uvIndex);
}

    // switch colours dependant on weather conditions 

    function uvColor(index){
        console.log("index",index);
        if (index>=0 && index<=3){
            $("#uv-color").attr("class","favourable");
        } else if (index>3 && index <=7){
            $("#uv-color").attr("class","moderate")
        } else {
            $("#uv-color").attr("class","severe")
        }
    }

    // 5 day forecast

    function fiveDay (city, info){

        for(var i=1;i<6;i++){}
    }

    // local storage 

    // event listeners 
