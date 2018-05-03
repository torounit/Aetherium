<?php

add_action( 'wp_enqueue_scripts', function () {
	wp_enqueue_style( 'vendor', get_theme_file_uri( 'dist/vendor.css' ) );
	wp_enqueue_style( 'main', get_theme_file_uri( 'dist/main.css' ) );
	wp_enqueue_script( 'wp-api' );
	wp_enqueue_script( 'vendor', get_theme_file_uri( 'dist/vendor.bundle.js' ), [], false, true );
	wp_enqueue_script( 'main', get_theme_file_uri( 'dist/main.bundle.js' ), [ 'vendor' ], false, true );

	$data = [
		'permastructs' => get_permastructs(),
		'themeFileUri' => get_theme_file_uri()
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

	$extra_permastructs = array_map( function ( $permastruct ) {
		return $permastruct['struct'];
	}, $wp_rewrite->extra_permastructs );

	if ( $wp_rewrite->use_verbose_page_rules ) {
		$permastructs = [
			'category' => $wp_rewrite->get_category_permastruct(),
			'tag'      => $wp_rewrite->get_tag_permastruct(),
			'search'   => $wp_rewrite->get_search_permastruct(),
			'author'   => $wp_rewrite->get_author_permastruct(),
			'date'     => $wp_rewrite->get_date_permastruct(),
			'month'    => $wp_rewrite->get_month_permastruct(),
			'year'     => $wp_rewrite->get_year_permastruct(),
			'post'     => $wp_rewrite->permalink_structure,
			'page'     => $wp_rewrite->get_page_permastruct(),
		];
	} else {
		$permastructs = [
			'category' => $wp_rewrite->get_category_permastruct(),
			'tag'      => $wp_rewrite->get_tag_permastruct(),
			'search'   => $wp_rewrite->get_search_permastruct(),
			'author'   => $wp_rewrite->get_author_permastruct(),
			'date'     => $wp_rewrite->get_date_permastruct(),
			'month'    => $wp_rewrite->get_month_permastruct(),
			'year'     => $wp_rewrite->get_year_permastruct(),
			'page'     => $wp_rewrite->get_page_permastruct(),
			'post'     => $wp_rewrite->permalink_structure,

		];
	}

	if ( get_option( 'page_for_posts' ) ) {
		$home_structs = [
			'front-page' => '/',
			'home' => get_page_uri( get_option( 'page_for_posts' ) )
		];
	}else {
		$home_structs = [
			'home' => '/'
		];
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
			'path' => '/' . user_trailingslashit( $struct )
		];
	}, array_keys( $permastructs ), array_values( $permastructs ) );
}
