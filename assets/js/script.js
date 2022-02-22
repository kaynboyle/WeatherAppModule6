const apiKey = "d0a06a26fc67ad3dcc286204f13f1864"; 
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
const exclude = "alerts";
var cityList = [];
const cityName ="Miami";
var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey}`;
// var apiURLLong = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${apiKey}`;

var currentWeatherDiv = $("#current-weather");
// if (localStorage.getItem("localWeatherSearches")) {
//     citiesArray = JSON.parse(localStorage.getItem("localWeatherSearches"));
//     writeSearchHistory(cityList);
// } else {
//     citiesArray = [];
// };


// $("#submitCity").click(function() {
//     //tried adding event listeners for event//
//     event.preventDefault();
//     let cityName = $("#cityInput").val();
//     returnCurrentWeather(cityName);
//     returnWeatherForecast(cityName);
// });
function submit(){
    let cityName = $("#search").val();
    returnCurrentWeather(cityName);
    returnWeatherForecast(cityName);
};
function currentWeather(){
    fetch(apiURL)
        .then((response)=>{
            var data =  response.json();
            return data;
        })
        .then(function(data){
            let weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            var today = new Date();
            var date = (today.getMonth()+1)+'/'+today.getDate()+''+today.getFullYear()
            var lat = data.lat;
            var lon = data.lon;
            ;
            currentWeatherDiv.html(`
            <h3>${data.name}, ${data.sys.country} (${date}) <img src=${weatherIcon} height="50px"> </h3>
            <h6>Temperature: ${data.main.temp}°F </h6>
            <h6>Wind: ${data.wind.speed}MPH </h6>
            <h6>Humidity: ${data.main.humidity}% </h6>
            `,UVIFunction(data.coord));
              // uv index data.coord
            console.log(data);
        })
        .catch(function(error) {
            alert("Unable to connect");
            console.log(error);
          });
};
function UVIFunction(latandlong){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latandlong.lat}&lon=${latandlong.lon}&exclude=${exclude}&appid=${apiKey}`)
        .then((response)=>{
            var data =  response.json();
            return data;
        })
        .then(function(data){
            if (data.current.uvi <= 4){
                currentWeatherDiv.append(`
                <h6 style="background-color:blue; margin-right:250px; color: white;">UVI: ${data.current.uvi}</h6>
                `)
            }
            else if (data.current.uvi <= 8){
                currentWeatherDiv.append(`
                <h6 style="color:green ;margin-right:250px; color: white;">UVI: ${data.current.uvi}</h6>
                `)
            }
            else if (data.current.uvi >= 11){
                currentWeatherDiv.append(`
                <h6 style="background-color:red; margin-right:250px; color: white;">UVI: ${data.current.uvi} </h6>
                `)
            }
            // currentWeatherDiv.append(`

            // <h6>UVI: ${data.current.uvi}</h6>
            
            // `);
              // uv index data.coord
            console.log(data);
        })
        .catch(function(error) {
            alert("Unable to connect");
            console.log(error);
          });
};

currentWeather();
// UVI();
// function weatherForecast(cityName){

// }

// function uvIndex(coordinates){

// }