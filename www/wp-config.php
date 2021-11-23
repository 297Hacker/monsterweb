<?php

/**
 * This file enables moving the config out of the webroot
 */

define( 'WP_CACHE', false );
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/wp' );
}

define( 'WP_DEBUG', true );
define('WP_MEMORY_LIMIT', '256M');

// Use dev versions of core JS and CSS files (only needed if you are modifying these core files)
define( 'SCRIPT_DEBUG', true );

/** Location of your WordPress configuration. */
require_once( realpath( ABSPATH . '../../wp-config.php' ) );

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
