(function () {

    let $ = require('jquery');

    function pageAnimation() {

        let $sliderActionLeft = $('.nav-content .left');
        let $sliderActionRight = $('.nav-content .right');

        fullpage = require('../../../../node_modules/@components/fullpage.js/dist/fullpage.extensions.min.js');
        fullpage = require('../../../../node_modules/@components/fullpage.js/vendors/scrolloverflow.js');

        new fullpage('#fullpage', {
            autoScrolling: true,
            anchors: ['index', 'services', 'clients', 'contact'],
            css3: true,
            controlArrows: false,
            continuousHorizontal: false,
            easingcss3: 'cubic-bezier(0.86, 0, 0.07, 1)',
            fadingEffect: true,
            licenseKey: '7BDE385F-4C334642-945E9044-5C8AC019',
            loopHorizontal: false,
            navigation: false,
            scrollHorizontally: true,
            scrollingSpeed: 1200,
            showActiveTooltip: false,
            slidesNavigation: true,
            touchSensitivity: 20

        });

        $sliderActionLeft.on('click', function () {
            fullpage_api.moveSlideLeft();
        });

        $sliderActionRight.on('click', function () {
            fullpage_api.moveSlideRight();
        });

    }

    pageAnimation();

})();



