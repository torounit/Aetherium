<?php

add_action( 'init', function () {
	if ( is_admin() ) {
		return;
	}
	global $wp_scripts;
	$jquery     = $wp_scripts->registered['jquery-core'];
	$jquery_ver = $jquery->ver;
	$jquery_src = $jquery->src;
	wp_deregister_script( 'jquery' );
	wp_deregister_script( 'jquery-core' );
	wp_register_script( 'jquery', false, [ 'jquery-core' ], $jquery_ver, true );
	wp_register_script( 'jquery-core', $jquery_src, [], $jquery_ver, true );
} );
