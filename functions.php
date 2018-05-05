<?php

add_action( 'after_setup_theme', function() {

	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_editor_style( get_stylesheet_uri() );

	/**
	 * Add support for core custom logo.
	 */
	add_theme_support( 'custom-logo', array(
		'height'      => 150,
		'width'       => 150,
		'flex-width'  => true,
		'flex-height' => true,
	) );

	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );
});

add_action( 'init', function() {
	if ( is_admin() ) {
		return;
	}
	global $wp_scripts;
	$jquery = $wp_scripts->registered['jquery-core'];
	$jquery_ver = $jquery->ver;
	$jquery_src = $jquery->src;
	wp_deregister_script( 'jquery' );
	wp_deregister_script( 'jquery-core' );
	wp_register_script( 'jquery', false, ['jquery-core'], $jquery_ver, true );
	wp_register_script( 'jquery-core', $jquery_src, [], $jquery_ver, true );
} );

add_action( 'wp_enqueue_scripts', function () {
	wp_enqueue_style( 'vendor', get_theme_file_uri( 'dist/vendor.css' ), [], '0.0.1' );
	wp_enqueue_style( 'main', get_theme_file_uri( 'dist/main.css' ), [], '0.0.1' );
	wp_enqueue_script( 'wp-api' );
	wp_enqueue_script( 'vendor', get_theme_file_uri( 'dist/vendor.bundle.js' ), [ 'wp-api' ], '0.0.1', true );
	wp_enqueue_script( 'main', get_theme_file_uri( 'dist/main.bundle.js' ), [ 'vendor' ], '0.0.1', true );

	$data = [
		'permastructs' => get_permastructs(),
		'pageForPosts' => absint( get_option( 'page_for_posts' ) ),
		'pageOnFront'  => absint( get_option( 'page_on_front' ) ),
	];
	$js   = sprintf( 'window.themeSettings = %s;', wp_json_encode( $data ) );
	wp_script_add_data( 'wp-api', 'data', $js );
} );


/**
 * Permastruct Lists.
 *
 * @return array
 */
function get_permastructs() {
	/**
	 * @var WP_Rewrite $wp_rewrite
	 */
	global $wp_rewrite;

	if ( get_option( 'page_for_posts' ) ) {
		$home_structs = [
			'front-page' => '/',
			'home'       => get_page_uri( get_option( 'page_for_posts' ) )
		];
	} else {
		$home_structs = [
			'home' => '/'
		];
	}

	$extra_permastructs = array_map( function ( $permastruct ) {
		return $permastruct['struct'];
	}, $wp_rewrite->extra_permastructs );

	$permastructs = [
		'search'   => $wp_rewrite->get_search_permastruct(),
		'author'   => $wp_rewrite->get_author_permastruct(),
		'date'     => $wp_rewrite->get_date_permastruct(),
		'month'    => $wp_rewrite->get_month_permastruct(),
		'year'     => $wp_rewrite->get_year_permastruct(),
	];

	if ( $wp_rewrite->use_verbose_page_rules ) {

		$permastructs['page'] = $wp_rewrite->get_page_permastruct();
		$permastructs['post'] = $wp_rewrite->permalink_structure;

	} else {
		$permastructs['post'] = $wp_rewrite->permalink_structure;
		$permastructs['page'] = $wp_rewrite->get_page_permastruct();
	}

	$permastructs = array_merge( $home_structs, $extra_permastructs, $permastructs );

	return array_map( function ( $key, $value ) {
		$struct = trim( preg_replace( '/%([^\/]+)%/', ':$1', $value ), '/\\' );
		$struct = str_replace(
			[
				':year',
				':monthnum',
				':day',
				':post_id'
			],
			[
				':year(\\d{4})',
				':monthnum(\\d{1,2})',
				':day(\\d{1,2})',
				':post_id(\\d+)'
			],
			$struct
		);

		return [
			'name' => $key,
			'path' => untrailingslashit( '/' . $struct ) . '/:endpoint(page)?/:page(\\d*)?'
		];

	}, array_keys( $permastructs ), array_values( $permastructs ) );
}

/**
 * Controller
 */
add_filter( 'query_vars', function ( $vars ) {
	$vars[] = 'sw';
	$vars[] = 'manifest';

	return $vars;
} );

add_action( 'template_redirect', function () {
	/**
	 * Global \WP_Query.
	 *
	 * @var \WP_Query;
	 */
	global $wp_query;

	if ( isset( $wp_query->query['sw'] ) ) {
		header( 'Content-Type: text/javascript' );
		header( 'Cache-Control: max-age=0' );
		header( 'Service-Worker-Allowed: /' );
		include dirname( __FILE__ ) . '/sw.js';
		exit;
	}

	if ( isset( $wp_query->query['manifest'] ) ) {
		header( 'Content-Type: application/manifest+json' );
		include dirname( __FILE__ ) . '/manifest.php';
		exit;
	}
} );
