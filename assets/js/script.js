const apiKey = "d0a06a26fc67ad3dcc286204f13f1864"; 
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
const exclude = "alerts";
var cityList = [];

// var apiURLLong = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${apiKey}`;

const currentWeatherDiv = $("#current-weather");
const submit_button = document.getElementById("submit");
const weekForecast = $("#weekForecast");
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
// function submit(){
//     let cityName = $("#search").val();
//     returnCurrentWeather(cityName);
//     returnWeatherForecast(cityName);
// };
submit_button.addEventListener("click", function(){
    let city_name = $("#search").val();
    currentWeather(city_name);
})

function currentWeather(city_name){
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&APPID=${apiKey}`;
    fetch(apiURL)
        .then((response)=>{
            var data =  response.json();
            return data;
        })
        .then(function(data){
            let weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            var today = new Date();
            var date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()
            ;
            currentWeatherDiv.html(`
            <h3>${data.name}, ${data.sys.country} (${date}) <img src=${weatherIcon} height="50px"> </h3>
            <h6>Temperature: ${data.main.temp}°F </h6>
            <h6>Wind: ${data.wind.speed}MPH </h6>
            <h6>Humidity: ${data.main.humidity}% </h6>
            `,
            UVIFunction(data.coord),
            fiveDayForecast(data.coord));
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
function fiveDayForecast(latandlong){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latandlong.lat}&lon=${latandlong.lon}&exclude=${exclude}&appid=${apiKey}`)
        .then((response)=>{

            var data =  response.json(); 
            return data;   
        })
        .then(function(data){
                weekForecast.append(`
                    <p>Temp: ${data.daily[0].temp.day}</p>
                `);
            })
        .catch(function(error) {
            alert("Unable to connect");
            console.log(error);
          })
};
// UVI();
// function weatherForecast(cityName){

// }

// function uvIndex(coordinates){

// }