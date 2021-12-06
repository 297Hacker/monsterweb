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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ({

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(18);


/***/ }),

/***/ 18:
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var name = document.querySelector('#name-input');
var lastname = document.querySelector('#lastname-input');
var email = document.querySelector('#email-input');
var error = document.querySelector('.error-message');
var message = document.querySelector('#message-input');
var form = document.querySelector('.contact-form');
var button = document.querySelector('#send-contact-btn');

document.addEventListener('DOMContentLoaded', function (ev) {
    if (typeof button !== 'undefined') {
        button.addEventListener('click', sendContact, false);
    } else {
        alert("button not loaded");
    }
    ev.preventDefault();
});

function isNotEmpty(value) {
    if (value == null || typeof value == 'undefined') return false;
    return value.length > 0;
}

function isNumber(num) {
    return num.length > 0 && !isNaN(num);
}

function isEmail(email) {
    var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(String(email).toLowerCase());
}

function fieldValidation(field, validationFunction) {
    if (field == null) return false;

    var isFieldValid = validationFunction(field.value);
    if (!isFieldValid) {
        field.className = 'invalid';
        error.classList.add('visible');
    } else {
        field.className = '';
        error.classList.remove('visible');
    }
    return isFieldValid;
}

function isValid() {
    var valid = true;

    valid &= fieldValidation(name, isNotEmpty);
    valid &= fieldValidation(lastname, isNotEmpty);
    valid &= fieldValidation(message, isNotEmpty);
    valid &= fieldValidation(email, isEmail);

    return valid;
}

function sendEmail() {
    Email.send({
        SecureToken: "3a27b1f5-cd7c-43d1-ae00-689d7f7e6497",
        Host: "smtp.gmail.com",
        Username: "nigelmaduro14@gmail.com",
        Password: "746ek8m6bkvnftW14@",
        To: 'nigelmaduro14@gmail.com',
        From: email,
        Subject: "email from monsterweb",
        Body: message
    });
    console.log('email send!');
}

var User = function User(name, lastname, email, message) {
    _classCallCheck(this, User);

    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.message = message;
};

function sendContact(ev) {
    ev.stopPropagation();
    var successMessage = document.querySelector('.success-message');
    if (isValid()) {
        var usr = new User(name.value, lastname.value, email.value, message.value);
        sendEmail();
        successMessage.textContent = 'Thanks ' + name.value + ' for sending us a messsage! we will get back to you shortly.';
        form.reset();
        form.classList.add('disable');
    } else {
        console.log('invalid');
    }
}

/***/ })

/******/ });