<?php

add_action( 'wp_enqueue_scripts', function () {
	$theme   = wp_get_theme( get_template() );
	$version = $theme->get( 'Version' );
	if( ! is_user_logged_in() ) {
		wp_enqueue_script( 'register-sw', get_theme_file_uri( 'register-sw.js' ), [], $version, true );
	} else {
		wp_enqueue_script( 'unregister-sw', get_theme_file_uri( 'unregister-sw.js' ), [], $version, true );
	}
} );

add_action( 'admin_enqueue_scripts', function () {
	$theme   = wp_get_theme( get_template() );
	$version = $theme->get( 'Version' );
	wp_enqueue_script( 'unregister-sw', get_theme_file_uri( 'unregister-sw.js' ), [], $version, true );
});

add_action( 'wp_head', function () {
	?>
	<link rel="manifest" href="<?php echo home_url( '?manifest' ); ?>">
	<?php
} );

add_action( 'template_redirect', function () {
	if ( isset( $_GET['sw'] ) ) {
		header( 'Content-Type: text/javascript' );
		header( 'Cache-Control: max-age=0' );
		header( 'Service-Worker-Allowed: /' );
		include dirname( __FILE__ ) . '/js/sw.js.php';
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
		return get_theme_file_uri( 'blank.png' );
	}
	return $url;
} );

add_filter( 'get_avatar_url', function ( $url ) {
	return preg_replace( '/http:\/\/[0-9]\.gravatar\.com/', 'https://secure.gravatar.com', $url );
} );
