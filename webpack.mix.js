'use strict';

const {mix} = require('laravel-mix');
let config = require('./buildconfig.json');

mix.sass('./src/' + config.theme_dirname + '/scss/style.scss', './www/wp-content/themes/' + config.theme_dirname + '/dist/css')
    .options({
        implementation: require('node-sass'),
        postCss: [
            require('autoprefixer')({
                // Browserslist config https://browserl.ist/
                browsers: [
                    'last 2 versions',
                    'iOS >= 8',
                    'Safari >= 8',
                ],
                cascade: false,
                flexbox: "no-2009"
            }),
        ]
    });
// compile images
mix.copy('./src/' + config.theme_dirname + '/img/', './www/wp-content/themes/' + config.theme_dirname + '/dist/img');

// compile react
mix.react('./src/' + config.theme_dirname + '/js/react.js', './www/wp-content/themes/' + config.theme_dirname + '/dist/js');

// compile JS
mix.js('./src/' + config.theme_dirname + '/js/libs.js', './www/wp-content/themes/' + config.theme_dirname + '/dist/js')
    .js('./src/' + config.theme_dirname + '/js/about.js', './www/wp-content/themes/' + config.theme_dirname + '/dist/js')
    .js('./src/' + config.theme_dirname + '/js/home.js', './www/wp-content/themes/' + config.theme_dirname + '/dist/js')
    .js('./src/' + config.theme_dirname + '/js/components/contact-form.js', './www/wp-content/themes/' + config.theme_dirname + '/dist/js')
    .js('./src/' + config.theme_dirname + '/js/main.js', './www/wp-content/themes/' + config.theme_dirname + '/dist/js');

//compile fonts
mix.copy('./src/' + config.theme_dirname + '/fonts', './www/wp-content/themes/' + config.theme_dirname + '/dist/fonts')
    .options({processCssUrls: false});

//enable browsersync
if (!mix.inProduction()) {
    mix.browserSync({
        files: [
            './src/' + config.theme_dirname + '/**/*',
            './www/wp-content/themes/' + config.theme_dirname + '/view/**/*',
        ],
        'proxy': 'monsterweb.test'
    });
}