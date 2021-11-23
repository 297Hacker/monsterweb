(function () {
    let $ = require('jquery');

    let $left_btn = $('.btn-left');
    let $slide = $('.slide').length;
    let $right_btn = $('.btn-right');
    let $content = $('.case-wrapper');
    let $width = $('.slide').width();
    let $window = $(window).innerWidth();

    let $sum = $slide * $width;

    $left_btn.on('click', function (ev) {
        ev.preventDefault();
        $content.animate({
            scrollLeft: $content.scrollLeft() - $width
        }, 500, 'swing');
        if($content.scrollLeft() + $width <= ($window - $width)){
            $left_btn.addClass('disable');
            $right_btn.removeClass('disable');
        }else {
            $left_btn.removeClass('disable');
            $right_btn.removeClass('disable');
        }
    });

    $right_btn.on('click', function (ev) {
        ev.preventDefault();
        $content.animate({
            scrollLeft: $content.scrollLeft() + $width
        }, 500, 'swing');
        if($content.scrollLeft() + $window >= $sum - ($width + 25)){
            $right_btn.addClass('disable');
            $left_btn.removeClass('disable');
        }else {
            $right_btn.removeClass('disable');
            $left_btn.removeClass('disable');
        }
    });

})();
