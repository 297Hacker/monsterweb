(function () {

    let $ = require('jquery');

    let $body = $('body');
    let $menu = $('.menu-toggle');
    let $header = $('.main-header');
    let $menuOpen = $('.menu-wrapper');
    const $button = $('.main-cta-btn');
    const $inputName = $('#name-input');

    // required js file
    $(document).ready(function () {
        $body.css('overflow', 'hidden');
        require('./components/particles');
        setTimeout(function () {
            $header.removeClass('animation');
            $menu.removeClass('animation');
        }, 1000);
    });

    $button.on('click', function () {
        $menuOpen.addClass('open');
        $menu.addClass('open');
        $inputName.focus();
    });

})();