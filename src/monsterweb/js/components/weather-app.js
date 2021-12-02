const input = document.querySelector('.search-input');
const submit = document.querySelector('.search-weather');
const loading = document.querySelector('.load');
const weatherCity = document.querySelector('.weatherCity');
const weatherDesc = document.querySelector('.weatherDescription');
const weatherCels = document.querySelector('.weatherCelsius');
const weatherFeelsLike = document.querySelector('.weatherFeelsLike');
const weatherSpeed = document.querySelector('.weatherWindSpeed');
const weatherSunRise = document.querySelector('.weatherSunRise');
const weatherSunSet = document.querySelector('.weatherSunSet');
const weatherFah = document.querySelector('.weatherFah');

submit.addEventListener('click', searchWeather);

const APP_ID = '89a1062777a8c237665d0c93060e4ac3';

class Http {
    static fetchData(url) {
        return new Promise((resolve, reject) => {
            const HTTP = new XMLHttpRequest();
            HTTP.open('GET', url);
            HTTP.onreadystatechange = function () {
                if (HTTP.readyState == XMLHttpRequest.DONE && HTTP.status == 200) {
                    const response_data = JSON.parse(HTTP.responseText);
                    resolve(response_data);
                } else if (HTTP.readyState == XMLHttpRequest.DONE) {
                    alert("city you are searching for is not found");
                    reject('something went wrong');
                    loading.classList.remove('active');
                }
            };
            HTTP.send();
        });
    }
}

class weatherData {
    constructor(name, description, cels, feelsLike, windSpeed, sunRise, sunSet) {
        this.name = name;
        this.description = description;
        this.cels = cels;
        this.feelsLike = feelsLike;
        this.windSpeed = windSpeed;
        this.sunRise = sunRise;
        this.sunSet = sunSet;
        this.fah = '';
    }
}

const weatherProxyHandler = {
    get: function (target, property) {
        return Reflect.get(target, property);
    },
    set: function (target, property, value) {
        const newValue = (value * 1.8 + 32).toFixed(2) + '°F';
        return Reflect.set(target, property, newValue);
    }
};

function searchWeather() {
    const searchedCity = input.value.trim();
    const URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + searchedCity + '&units=metric&appid=' + APP_ID;

    if (searchedCity.length === 0) {
        alert("enter a city name");
    }
    loading.classList.add('active');
    Http.fetchData(URL).then(response => {
        const WEATHER_DATA = new weatherData(searchedCity, response.weather[0].description, response.main.temp, response.main.feels_like, response.wind.speed, response.sys.sunrise, response.sys.sunset);
        const WEATHER_PROXY = new Proxy(WEATHER_DATA, weatherProxyHandler);
        WEATHER_PROXY.fah = response.main.temp;
        updateWeather(WEATHER_PROXY);
    }).catch(err => console.log(err));

}

function updateWeather(weatherData) {
    weatherCity.textContent = weatherData.name;
    weatherDesc.textContent = weatherData.description;
    weatherCels.textContent = Math.round(weatherData.cels) + "°C";
    weatherFeelsLike.textContent = Math.round(weatherData.feelsLike) + "°C";
    weatherSpeed.textContent = weatherData.windSpeed;
    weatherSunRise.textContent = weatherData.sunRise;
    weatherSunSet.textContent = weatherData.sunSet;
    weatherFah.textContent = weatherData.fah;

    loading.classList.remove('active');
}