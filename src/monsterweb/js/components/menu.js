(function () {

    let $ = require('jquery');

    let $menu_btn = $('.menu-toggle');
    let $menu_open_btn = $('.menu-toggle:before');
    let $menu_close_btn = $('.menu-toggle:after');
    let $main_menu = $('.menu-wrapper');

    function mobileMenu() {

        function addClass() {
            $menu_btn.toggleClass('open');
            $menu_open_btn.toggleClass('open');
            $menu_close_btn.toggleClass('open');
            $main_menu.toggleClass('open');
        }

        $menu_btn.on('click', function () {
            addClass();
        });
    }

    mobileMenu();

})();