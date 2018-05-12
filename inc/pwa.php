<?php


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
