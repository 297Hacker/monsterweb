<?php
/**
 * Clean wordpress default code
 */
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );

if ( ! function_exists( 'load_scripts' ) ) :
	function load_scripts() {

		wp_enqueue_style( 'styles', get_template_directory_uri() . '/dist/css/style.css', true );
		wp_enqueue_script( 'libs', get_template_directory_uri() . '/dist/js/libs.js', [], '', true );
		wp_enqueue_script( 'main', get_template_directory_uri() . '/dist/js/main.js', [], '', true );
		wp_enqueue_script( 'jquery', 'https://code.jquery.com/jquery-3.4.1.js', true );

	}
endif;
add_action( 'wp_enqueue_scripts', 'load_scripts' );

/**
 * Remove Wp admin menu
 */
remove_action( 'wp_head', 'wp_generator' );

add_filter( 'show_admin_bar', '__return_false' );

if ( ! function_exists( 'unload_scripts' ) ) :
	function unload_scripts() {

		wp_deregister_script( 'wp-embed' );

	}
endif;
add_action( 'wp_footer', 'unload_scripts' );

/**
 * Add wordpress menu
 */
if ( ! function_exists( 'add_menus' ) ) :
	function add_menus() {
		register_nav_menu( 'main-menu', __( 'Main Menu' ) );
	}

	add_action( 'init', 'add_menus' );
endif;

/**
 * Include Timber
 */
require_once( __DIR__ . '/../../../../vendor/autoload.php' );
$timber          = new \Timber\Timber();
Timber::$dirname = [ 'view', 'view/components', 'view/layout' ];

/**
 * Adds Timber menu
 */
//new Timber();
//Timber::$dirname = [
//	'view/layout',
//];

if ( ! function_exists( 'add_to_context' ) ) :
	function add_to_context( $context ) {
		$context['mainmenu'] = new Timber\Menu( 'mainmenu' );
		$context['option']   = get_fields( 'option' );
		$context['is_home']  = is_front_page();

		return $context;
	}

	add_filter( 'timber_context', 'add_to_context' );
endif;

/**
 * Adds options page
 */
add_action('acf/init', 'my_acf_op_init');
function my_acf_op_init() {

	// Check function exists.
	if( function_exists('acf_add_options_page') ) {

		// Register options page.
		$option_page = acf_add_options_page(array(
			'page_title'    => __('Theme Settings'),
			'menu_title'    => __('Theme Settings'),
			'menu_slug'     => 'theme-general-settings',
			'capability'    => 'edit_posts',
			'redirect'      => false
		));
	}
}

/**
 * remove jQuery from console
 */
add_action( 'wp_default_scripts', function ( $scripts ) {
	if ( ! empty( $scripts->registered['jquery'] ) ) {
		$scripts->registered['jquery']->deps = array_diff( $scripts->registered['jquery']->deps, [ 'jquery-migrate' ] );
	}
} );

/**
 * React in wordpress
 */
//add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles' );
//function my_theme_enqueue_styles() {
//
//	$parent_style = 'monsterweb';
//
//	wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
//
//	wp_enqueue_style( 'child-style',
//		get_stylesheet_directory_uri() . '/style.css',
//		[ $parent_style ],
//		time() //For production use wp_get_theme()->get('Version')
//	);
//
//	wp_enqueue_script(
//		'my-theme-frontend',
//		get_stylesheet_directory_uri() . '/build/index.js',
//		['wp-element'],
//		time() //For production use wp_get_theme()->get('Version')
//	);
//
//}