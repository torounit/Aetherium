<?php


add_action( 'wp_enqueue_scripts', function () {
	if( ! is_user_logged_in() ) {
		wp_enqueue_script( 'register-sw', get_theme_file_uri( 'register-sw.js' ), [], '0.0.1', true );
	} else {
		wp_enqueue_script( 'unregister-sw', get_theme_file_uri( 'unregister-sw.js' ), [], '0.0.1', true );
	}
} );

add_action( 'admin_enqueue_scripts', function () {
	wp_enqueue_script( 'unregister-sw', get_theme_file_uri( 'unregister-sw.js' ), [], '0.0.1', true );
});


add_action( 'wp_head', function () {
	?>
	<link rel="manifest" href="<?php echo home_url( '?manifest' ); ?>">
	<?php
} );

add_action( 'template_redirect', function () {
	/**
	 * Global \WP_Query.
	 *
	 * @var \WP_Query;
	 */
	global $wp_query;

	if ( isset( $_GET['sw'] ) ) {
		header( 'Content-Type: text/javascript' );
		header( 'Cache-Control: max-age=0' );
		header( 'Service-Worker-Allowed: /' );
		include dirname( __FILE__ ) . '/js/sw.js.php';
		exit;
	}

	if ( isset( $_GET['assets'] ) ) {
		header( 'Content-Type: application/manifest+json' );
		echo json_encode( get_option( 'aetherium_assets', [] ) );
		exit;
	}

	if ( isset( $_GET['manifest'] ) ) {
		header( 'Content-Type: application/manifest+json' );
		include dirname( __FILE__ ) . '/manifest.php';
		exit;
	}
} );

add_filter( 'get_site_icon_url', function ( $url ) {
	if ( ! $url ) {
		return get_theme_file_uri( 'icon.svg' );
	}

	return $url;

} );
