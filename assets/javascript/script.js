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
        <div class="container m-1 border rounded border-dark ">
        <h3> Current Weather</h3>
        <li>Date: ${currentDate} </li>
        <li>Temperature: ${info.current.temp}&#8451</li>
        <li>Humidity: ${info.current.humidity}%</li>
        <li>Wind Speed: ${info.current.wind_speed} MPH</li>
        <li>UV Index: ${uvIndex}</li>
        </div>`

        // <span id= "uv-color">/span> need to get working 
  
        
    )

    // make uv color
    uvColor (uvIndex);
}

    // switch colours dependant on weather conditions 

    function uvColor(index){
        console.log("index",index);
        if (index>=0 && index<=3){
            $("#uv-color").attr("class","favorable");
        } else if (index>3 && index <=7){
            $("#uv-color").attr("class","moderate")
        } else {
            $("#uv-color").attr("class","severe")
        }
    }

    // 5 day forecast

    function fiveDay (city, info){

        for(var i=1;i<6;i++){
    

    var unixTime = info.daily[i].dt;
    var dailyDate = dayjs.unix(unixTime).format("DD/MM/YYYY")
    var dailyIcon = info.daily[i].weather[0].icon
    var dailyTemp = info.daily[i].temp.day;
    var windSpeed = info.daily[i].wind_speed;
    var dailyHumidity = info.daily[i].humidity;

    // create 5 day html element 
    $(".forecast-container").append(
      `
      <div class="col-sm-2 daily-container border rounded border-dark ${i}"></div>

      `
    )

    //
    $(`.${i}`).append(
      `
         <h7>${dailyDate}</h7>
      <img src=http://openweathermap.org/img/wn/${dailyIcon}@2x.png>
      <p>Temp: ${dailyTemp}&#8451</p>
      <p>Wind:${windSpeed}MPH</p>
      <p>Humidity: ${dailyHumidity} </p>
      
      `
    )

    }
  }

    // local storage 

    // event listeners 
