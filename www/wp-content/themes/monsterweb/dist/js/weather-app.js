/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ({

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(20);


/***/ }),

/***/ 20:
/***/ (function(module, exports) {

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var main = document.querySelector('.main');
var input = document.querySelector('.search-input');
var submit = document.querySelector('.search-weather');
var loading = document.querySelector('.load');
var weatherCity = document.querySelector('.weatherCity');
var weatherDesc = document.querySelector('.weatherDescription');
var weatherCels = document.querySelector('.weatherCelsius');
var weatherFeelsLike = document.querySelector('.weatherFeelsLike');
var weatherSpeed = document.querySelector('.weatherWindSpeed');
var weatherSunRise = document.querySelector('.weatherSunRise');
var weatherSunSet = document.querySelector('.weatherSunSet');
var weatherFah = document.querySelector('.weatherFah');
var weatherFahFeelLike = document.querySelector('.weatherFahFeelLike');
var changeInput = document.querySelector('.change-temp-output');

var weatherIcon = document.querySelector('weather-app-icon');

submit.addEventListener('click', searchWeather);

changeInput.addEventListener('click', changeOutput);

function changeOutput() {
    weatherFah.classList.toggle('not-active');
    weatherFahFeelLike.classList.toggle('not-active');
    weatherFeelsLike.classList.toggle('not-active');
    weatherCels.classList.toggle('not-active');

    if (weatherFah.classList.contains('not-active')) {
        changeInput.innerHTML = 'in °F';
    } else if (weatherCels.classList.contains('not-active')) {
        changeInput.innerHTML = 'in °C';
    }
}

var APP_ID = '89a1062777a8c237665d0c93060e4ac3';

var Http = function () {
    function Http() {
        _classCallCheck(this, Http);
    }

    _createClass(Http, null, [{
        key: 'fetchData',
        value: function fetchData(url) {
            return new Promise(function (resolve, reject) {
                var HTTP = new XMLHttpRequest();
                HTTP.open('GET', url);
                HTTP.onreadystatechange = function () {
                    if (HTTP.readyState == XMLHttpRequest.DONE && HTTP.status == 200) {
                        var response_data = JSON.parse(HTTP.responseText);
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
    }]);

    return Http;
}();

var weatherData = function weatherData(name, status, description, cels, feelsLike, windSpeed, sunRise, sunSet, timeZone) {
    _classCallCheck(this, weatherData);

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
};

var weatherProxyHandler = {
    get: function get(target, property) {
        return Reflect.get(target, property);
    },
    set: function set(target, property, value) {
        var newValue = (value * 1.8 + 32).toFixed(2) + '°F';
        return Reflect.set(target, property, newValue);
    }
};

function searchWeather() {
    var searchedCity = input.value.trim();
    var URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + searchedCity + '&units=metric&appid=' + APP_ID;

    if (searchedCity.length === 0) {
        alert("enter a city name");
    }
    loading.classList.add('active');
    Http.fetchData(URL).then(function (response) {
        var WEATHER_DATA = new weatherData(searchedCity, response.weather[0].main, response.weather[0].description, response.main.temp, response.main.feels_like, response.wind.speed, response.sys.sunrise, response.sys.sunset, response.timezone);
        var WEATHER_PROXY = new Proxy(WEATHER_DATA, weatherProxyHandler);
        WEATHER_PROXY.fah = response.main.temp;
        WEATHER_PROXY.fahFeelLike = response.main.feels_like;
        updateWeather(WEATHER_PROXY);
    }).catch(function (err) {
        return console.log(err);
    });
    main.classList.remove('inactive');
}

function setIcons(desc) {
    var imageArray = ["Clouds", "Fog", "Drizzle", "Sun", "Clear", "Rain"];
    var s = desc;
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
    var sunRiseUTC = weatherData.sunRise + weatherData.timeZone;
    var sunSetUTC = weatherData.sunSet + weatherData.timeZone;
    var miliSecSunRise = sunRiseUTC * 1000;
    var miliSecSunSet = sunSetUTC * 1000;
    var date = new Date(miliSecSunRise);
    date.setHours(date.getHours() - 1);
    var dateSunSet = new Date(miliSecSunSet);
    dateSunSet.setHours(dateSunSet.getHours() - 1);
    var dateFormat = date.toLocaleString("en-US", { hour: "numeric", minute: "numeric", second: "numeric" });
    var dateFormatSunSet = dateSunSet.toLocaleString("en-US", { hour: "numeric", minute: "numeric", second: "numeric" });

    //calculate windspeed in km/hour
    var windSpeedMiles = weatherData.windSpeed * 2.23694;
    var windSpeedKilo = (windSpeedMiles * 1.60934).toFixed(2);

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

/***/ })

/******/ });