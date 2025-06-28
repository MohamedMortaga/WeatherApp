var today=document.getElementById("today");
var tomorrow=document.getElementById("tomorrow");
var dayafter=document.getElementById("dayafter");
let APIUrl = "https://api.weatherapi.com/v1";
let APIKey = "aaabcb4e691e464eafb125728252806";
let searchInput = document.getElementById("search");
let searchform = document.getElementById("form");
window.onload = function () {
    if("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                getWeather(`${latitude},${longitude}`);
            },
            () => {
                getWeather("cairo");
            }
        );
    }
    getWeather("cairo");
}

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

searchInput.addEventListener("input", debounce(function () {
    let city = searchInput.value.trim();
    if (city) {
        getWeather(city);
    }
}, 500));

async function getWeather(city = "cairo") {
    let apiUrl = `${APIUrl}/forecast.json?key=${APIKey}&q=${city}&days=3`;
    let response = await fetch(apiUrl);
    let data = await response.json();
    console.log(data);
    // today
    const todayDate = new Date(data.forecast.forecastday[0].date);
    const todayDayName = todayDate.toLocaleDateString("en-US", { weekday: "long" });
    today.innerHTML = `<div  class="card-header text-start">${todayDayName} <span class="float-end">${data.forecast.forecastday[0].date}</span></div>
                     <div class="card-body text-start py-5">
                        <h5 id="city" class="card-title">${data.location.name}</h5>
                        <h2 id="temp" class="card-title d-inline">${data.current.temp_c}°C</h2>
                        <img src="./imgi_2_143.png" alt="sun icon" class="w-25">
                        <br>
                        <p  class="badge bg-secondary">${data.forecast.forecastday[0].day.condition.text}</p>
                        <div class="bot justify-content-between d-flex">
                            <i class="bi bi-thermometer-half ">${data.current.wind_dir}</i>
                            <i class="bi bi-wind ">${data.forecast.forecastday[0].day.maxwind_kph}km/h</i>
                            <i class="bi bi-umbrella "> ${data.forecast.forecastday[0].day.daily_chance_of_rain}%</i>
                        </div>
                    </div>`;
    // tomorrow
    const tomorrowDate = new Date(data.forecast.forecastday[1].date);
    const tomorrowDayName = tomorrowDate.toLocaleDateString("en-US", { weekday: "long" });
    tomorrow.innerHTML = `<div class="card-header">${tomorrowDayName}</div>
                    <div class="card-body p-5">
                        <img src="./imgi_6_113.png" alt="sun icon" class="w-25">
                        <h5 class="card-title">${data.forecast.forecastday[1].day.maxtemp_c}°C</h5>
                        <h6>${data.forecast.forecastday[1].day.mintemp_c}°C</h6>
                        <span class="badge bg-secondary">${data.forecast.forecastday[1].day.condition.text}</span>
                    </div>`;
    // dayafter
    const dayafterDate = new Date(data.forecast.forecastday[2].date);
    const dayafterDayName = dayafterDate.toLocaleDateString("en-US", { weekday: "long" });
    dayafter.innerHTML = `<div class="card-header">${dayafterDayName}</div>
                    <div class="card-body p-5">
                        <img src="./imgi_6_113.png" alt="sun icon" class="w-25">
                        <h5 class="card-title">${data.forecast.forecastday[2].day.maxtemp_c}°C</h5>
                        <h6>${data.forecast.forecastday[2].day.mintemp_c}°C</h6>
                        <span class="badge bg-secondary">${data.forecast.forecastday[2].day.condition.text}</span>
                    </div>`;
    console.log(data.forecast.forecastday[0]);
}
