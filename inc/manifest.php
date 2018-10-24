<?php
/**
 * View for manifest.
 *
 * @package Smart_PWA
 */

$manifest = [
	'name'             => esc_html( get_bloginfo( 'name' ) ),
	'short_name'       => esc_html( get_bloginfo( 'name' ) ),
	'start_url'        => trailingslashit( home_url() ),
	'lang'             => get_bloginfo( 'language' ),
	'display'          => 'standalone',
	'background_color' => '#'.get_background_color(),
	'description'      => esc_html( get_bloginfo( 'description' ) ),
	'theme_color'      => '#42b983'
];

if ( has_site_icon() ) {
	$manifest['icons'] = [
		[
			'src'   => get_site_icon_url(),
			'sizes' => '512x512',
		],
	];
};
echo json_encode( $manifest );
