(function () {

    let $ = require('jquery');

    let $about = $('.about');
    let $case_wrapper = $('.case-wrapper');
    let $design = $('.design');
    let $404_wrapper = $('.wrapper-404');
    let $header = $('.main-header');
    let $menu = $('.menu-toggle');
    let $home_content = $('.home-content-wrapper');
    let $spacing = $('.spacing');

    $(document).ready(function () {
        setTimeout(function () {
            $about.addClass('animation');
            $case_wrapper.addClass('animation');
            $design.addClass('animation');
            $404_wrapper.addClass('animation');
            $header.removeClass('animation');
            $menu.removeClass('animation');
            $spacing.addClass('animation');
            $home_content.addClass('animation');
        }, 500);
    });

})();