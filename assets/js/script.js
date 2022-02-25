const apiKey = "d0a06a26fc67ad3dcc286204f13f1864"; 
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
const exclude = "alerts";
var cityList = [];

// var apiURLLong = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${apiKey}`;

const currentWeatherDiv = $("#current-weather");
const submit_button = document.getElementById("submit");
const weekForecast = $("#weekForecast");
const storageDiv = $("#localStorage");

submit_button.addEventListener("click", function(){
    let city_name = $("#search").val();
    currentWeather(city_name);
    storageSet(city_name);
});
function storageSet(city_name){
    window.localStorage.setItem(city_name, city_name);
    console.log(localStorage);
    // var storageLength = localStorage.length;
    var displayStorage = window.localStorage.getItem(city_name);
    storageDiv.append(`
    <p> ${displayStorage}</p>
    `);
}


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
            currentWeatherDiv.append(`
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
            let weatherIcon = `https://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png`;
            for (i=0; i<5; i++){
                weatherIcon = `https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`;
        
                weekForecast.append(`
                <div class="day">
                    <h3>Day ${i+1}</h3>
                    <p>Temp: ${data.daily[i].temp.day}°F <img src=${weatherIcon} height="50px"></p>
                    <p>Humidity: ${data.daily[i].humidity} %</p>
                    <p>Wind: ${data.daily[i].wind} MPH</p>
                </div>
                `);
            };
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
{/* <div class="day">
                    <h3>Day 2</h3>
                    <pTemp:  ${data.daily[1].temp.day}°F  <img src=${weatherIcon} height="50px"></p>
                    <p>Humidity: ${data.daily[1].humidity} %</p>
                    <p>Wind: ${data.daily[1].wind} MPH</p>
                </div>
                <div class="day">
                    <pTemp:  ${data.daily[2].temp.day}°F</p>
                    <p>Humidity: ${data.daily[2].humidity} %</p>
                    <p>Wind: ${data.daily[2].wind} MPH</p>
                </div>
                <div class="day">
                    <pTemp:  ${data.daily[3].temp.day}°F</p>
                    <p>Humidity: ${data.daily[3].humidity} %</p>
                    <p>Wind: ${data.daily[3].wind} MPH</p>
                </div>
                <div class="day">
                    <pTemp:  ${data.daily[4].temp.day}°F</p>
                    <p>Humidity: ${data.daily[4].humidity} %</p>
                    <p>Wind: ${data.daily[4].wind} MPH</p>
                </div> */}