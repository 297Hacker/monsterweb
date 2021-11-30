(function () {

    let $ = require('jquery');
    let $logo = $('.main-logo');

    // required js file
    $(document).ready(function () {
        $logo.addClass('animation');
        require('./components/animation');
        require('./components/cases');
        require('./components/general');
        require('./components/menu');
    });

})();