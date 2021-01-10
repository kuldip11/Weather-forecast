var api = {
    key : "d069687c0e086de4022bf67ee8c0617d",
    base :"https://api.openweathermap.org/data/2.5/" 
}

let latitude,longitude;

var loc=new Array();
var searchbox = document.querySelector('.search-box');
currentlocation()

searchbox.addEventListener('keypress',setQuery);

function currentlocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
    }
}

function setPosition(position){
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

function getWeather(lat,lon) {
    fetch(`${api.base}weather?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
}

function setQuery(evt) {
    let city = document.querySelector('.location .city');
    city.innerHTML = "";
    loc.pop()
    if (evt.keyCode == 13) {
       getResults(searchbox.value)
       console.log(searchbox.value);
    }
}

function getResults(query) {
    if(query==""){
        currentlocation()
        return ;
    }
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather =>{ 
       return weather.json();
   }) .then(displayResults)
}

function displayResults(weather) {
    loc.push(`${weather.name},${weather.sys.country}`);
    new TypeIt(".location .city", {
     speed: 100,
     waitUntilVisible: false
     })
     .type(loc, {delay: 3000})
     .go();
     console.log(loc);
   let temp = document.querySelector('.current .temp');
   temp.innerHTML = `${Math.round(weather.main.temp)}°c`;

   let weather_el = document.querySelector('.current .weather');
   weather_el.innerHTML = weather.weather[0].main;

   let hilow = document.querySelector('.current .hi-low');   
   hilow.innerHTML = `${weather.main.temp_min}°c / ${weather.main.temp_max}°c`;

   
}
