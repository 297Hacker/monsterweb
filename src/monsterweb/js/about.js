(function () {

    let $ = require('jquery');
    let Typed = require('../../../node_modules/@components/typed.js/lib/typed');

    let typed;
    let $newcount;
    let $count = 50;
    let $body = $('body');
    let $about_wrapper = $('.about-cta');
    let $textClick = $('.click-text');
    let $text = $('.text-string');
    let type_content = document.querySelector('.typed-about');
    let $menuOpen = $('.menu-wrapper');
    const $button = $('.about-btn');
    const $toggle = $('.menu-toggle');
    const $inputName = $('#name-input');

    $(document).ready(function () {
        $body.css('overflow', 'hidden');
        $text.addClass('animate');
    });

    $button.on('click', function () {
        $menuOpen.addClass('open');
        $toggle.addClass('open');
        $inputName.focus();
    });

    function createTyped() {

        let options = {
            stringsElement: '.typed-about-strings',
            backDelay: 2000,
            backSpeed: 40,
            startDelay: 2000,
            typeSpeed: $count,
            loop: false,
            onComplete: function () {
                $about_wrapper.addClass('animation');
                typedmini.destroy();
            }
        };

        typed = new Typed(type_content, options);

    }

    createTyped();

    $textClick.on('click', function () {
        $count = $count - 10;
        $newcount = $count;
        typed.typeSpeed = $newcount;
    });

})();