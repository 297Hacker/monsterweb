let $ = require('jquery');

let $design = $('.design-logo');
let $designFirst = $('.design-logo:first-child');
let $counter = $('.design-logo').length;


$(window).on('load', function () {
    $designFirst.addClass('animate');
    setInterval();
});

setInterval (function(){
    for(let i = 0; i < $counter; i++) {
        if ($design.hasClass('animate')) {
            $design.next().addClass('animate');
        }
    }
}, 5000);