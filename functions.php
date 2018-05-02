<?php

add_action( 'wp_enqueue_scripts', function () {
  wp_enqueue_style( 'app', get_theme_file_uri( 'dist/style.css' ) );
  wp_enqueue_script( 'wp-api' );
  wp_enqueue_script( 'build', get_theme_file_uri( 'dist/build.js' ), [], false, true );
  $data = [
    'permastructs' => get_permastructs(),
    'themeFileUri' => get_theme_file_uri()
  ];
  $js   = sprintf( 'window.permastruct = %s;', wp_json_encode( $data ) );
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

  $permastructs = array_merge( $extra_permastructs, $permastructs );

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
      'name'   => $key,
      'struct' => '/' . $struct . '/*'
    ];
  }, array_keys( $permastructs ), array_values( $permastructs ) );
}
