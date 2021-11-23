const name = document.querySelector('#name-input');
const lastname = document.querySelector('#lastname-input');
const email = document.querySelector('#email-input');
const error = document.querySelector('.error-message');
const message = document.querySelector('#message-input');
const form = document.querySelector('.contact-form');
const button = document.querySelector('#send-contact-btn');

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
    return (num.length > 0) && !isNaN(num);
}

function isEmail(email) {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(String(email).toLowerCase());
}

function fieldValidation(field, validationFunction) {
    if (field == null) return false;

    const isFieldValid = validationFunction(field.value);
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
    let valid = true;

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

class User {
    constructor(name, lastname, email, message) {
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.message = message;
    }
}

function sendContact(ev) {
    ev.stopPropagation();
    let successMessage = document.querySelector('.success-message');
    if (isValid()) {
        let usr = new User(name.value, lastname.value, email.value, message.value);
        sendEmail();
        successMessage.textContent = `Thanks ${name.value} for sending us a messsage! we will get back to you shortly.`;
        form.reset();
        form.classList.add('disable');
    } else {
        console.log('invalid');
    }
}

