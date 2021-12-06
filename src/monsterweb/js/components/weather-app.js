const main = document.querySelector('.main');
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
const weatherFahFeelLike = document.querySelector('.weatherFahFeelLike');
const changeInput = document.querySelector('.change-temp-output');

const weatherIcon = document.querySelector('weather-app-icon');

submit.addEventListener('click', searchWeather);

changeInput.addEventListener('click', changeOutput);

function changeOutput() {
    weatherFah.classList.toggle('not-active');
    weatherFahFeelLike.classList.toggle('not-active');
    weatherFeelsLike.classList.toggle('not-active');
    weatherCels.classList.toggle('not-active');

    if (weatherFah.classList.contains('not-active')) {
        changeInput.innerHTML = 'in °F'
    } else if (weatherCels.classList.contains('not-active')) {
        changeInput.innerHTML = 'in °C'
    }
}

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
    constructor(name, status, description, cels, feelsLike, windSpeed, sunRise, sunSet, timeZone) {
        this.name = name;
        this.description = description;
        this.status = status;
        this.cels = cels;
        this.feelsLike = feelsLike;
        this.windSpeed = windSpeed;
        this.sunRise = sunRise;
        this.sunSet = sunSet;
        this.timeZone = timeZone;
        this.fah = '';
        this.fahFeelLike = '';
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
    const URL = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchedCity + '&units=metric&appid=' + APP_ID;

    if (searchedCity.length === 0) {
        alert("enter a city name");
    }
    loading.classList.add('active');
    Http.fetchData(URL).then(response => {
        const WEATHER_DATA = new weatherData(searchedCity, response.weather[0].main, response.weather[0].description, response.main.temp, response.main.feels_like, response.wind.speed, response.sys.sunrise, response.sys.sunset, response.timezone);
        const WEATHER_PROXY = new Proxy(WEATHER_DATA, weatherProxyHandler);
        WEATHER_PROXY.fah = response.main.temp;
        WEATHER_PROXY.fahFeelLike = response.main.feels_like;
        updateWeather(WEATHER_PROXY);
    }).catch(err => console.log(err));
    main.classList.remove('inactive');
}

function setIcons(desc) {
    const imageArray = ["Clouds", "Fog", "Drizzle", "Sun", "Clear", "Rain"];
    let s = desc;
    if (s === imageArray[0]) {
        main.classList.add('clouds');
        main.classList.remove('fog', 'drizzle', 'sun', 'clear', 'rain');
    } else if (s === imageArray[1]) {
        main.classList.add('fog');
        main.classList.remove('clouds', 'drizzle', 'sun', 'clear', 'rain');
    } else if (s === imageArray[2]) {
        main.classList.add('drizzle');
        main.classList.remove('fog', 'clouds', 'sun', 'clear', 'rain');
    } else if (s === imageArray[3]) {
        main.classList.add('sun');
        main.classList.remove('fog', 'drizzle', 'clouds', 'clear', 'rain');
    } else if (s === imageArray[4]) {
        main.classList.add('clear');
        main.classList.remove('fog', 'drizzle', 'sun', 'clouds', 'rain');
    } else {
        main.classList.add('rain');
        main.classList.remove('fog', 'drizzle', 'sun', 'clear', 'clouds');
    }
}

function updateWeather(weatherData) {
    //calculate sunrise & sunset time
    let sunRiseUTC = weatherData.sunRise + weatherData.timeZone;
    let sunSetUTC = weatherData.sunSet + weatherData.timeZone;
    let miliSecSunRise = sunRiseUTC * 1000;
    let miliSecSunSet = sunSetUTC * 1000;
    let date = new Date(miliSecSunRise);
    date.setHours(date.getHours() - 1);
    let dateSunSet = new Date(miliSecSunSet);
    dateSunSet.setHours(dateSunSet.getHours() - 1);
    let dateFormat = date.toLocaleString("en-US", {hour: "numeric", minute: "numeric", second: "numeric"});
    let dateFormatSunSet = dateSunSet.toLocaleString("en-US", {hour: "numeric", minute: "numeric", second: "numeric"});

    //calculate windspeed in km/hour
    let windSpeedMiles = weatherData.windSpeed * 2.23694;
    let windSpeedKilo = (windSpeedMiles * 1.60934).toFixed(2);

    weatherCity.textContent = weatherData.name;
    weatherDesc.textContent = weatherData.description;
    weatherCels.textContent = Math.round(weatherData.cels) + "°C";
    weatherFeelsLike.textContent = "feels like " + Math.round(weatherData.feelsLike) + "°C";
    weatherSpeed.textContent = windSpeedKilo + " km/hour";
    weatherSunRise.textContent = dateFormat + " sunrise";
    weatherSunSet.textContent = dateFormatSunSet + " sunset";
    weatherFah.textContent = weatherData.fah;
    weatherFahFeelLike.textContent = "feels like " + weatherData.fahFeelLike;

    loading.classList.remove('active');
    setIcons(weatherData.status);
}