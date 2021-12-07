(function () {

    let $ = require('jquery');

    let $body = $('body');
    let $cursor = $('.cursor');
    let $cursorbck = $('.cursor-background');

    $(document).mousemove(function (e) {
        $cursor.css({
            left: e.pageX - 9.5,
            top: e.pageY - 10
        });
        $cursorbck.css({
            left: e.pageX - 25.5,
            top: e.pageY - 26.5
        });
    });

    $(document).ready(function () {
        setTimeout(function () {
            $cursor.removeClass('disable');
            $cursorbck.removeClass('disable');
        }, 1000)
    });

    function initCursor() {
        $body.on('mousemove', function () {
        }).on('mouseenter', "a, button, .typed-about, #name-input, #lastname-input, #email-input, #message-input, .click-text, input", function () {
            $cursor.addClass('disable');
            $cursorbck.addClass('disable');
        }).on('mouseleave', "a, button, .typed-about, #name-input, #lastname-input, #email-input, #message-input, .click-text, input", function () {
            $cursor.removeClass('disable');
            $cursorbck.removeClass('disable');
        });
    }

    initCursor();

})();