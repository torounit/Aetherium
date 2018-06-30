<?php

/**
 * Class Assets_Seeker
 */
class Assets_Seeker {

	/**
	 * An array of asset url.
	 *
	 * @var array
	 */
	private $assets = [];

	/**
	 * Default asset version.
	 *
	 * @var string
	 */
	private $default_version;

	/**
	 * Assets_Seeker constructor.
	 */
	public function __construct() {

		global $wp_styles;
		global $wp_scripts;
		$this->default_version = get_bloginfo( 'version' );

		$styles       = $this->search_dependencies( $wp_styles, $wp_styles->queue );
		$scripts      = $this->search_dependencies( $wp_scripts, $wp_scripts->queue );
		$assets       = array_merge( $styles, $scripts );
		$assets       = array_map( function ( $asset ) {
			if ( 0 === strpos( $asset, '/' ) ) {
				return $asset;
			}
			if ( false !== strpos( $asset, home_url() ) ) {
				return str_replace( trailingslashit( home_url() ), '/', $asset );
			}
		}, $assets );
		$this->assets = array_merge( $this->assets, array_filter( array_unique( $assets ) ) );
	}

	/**
	 * Search dependency urls.
	 *
	 * @param \WP_Dependencies $dependencies Dependencies object.
	 * @param array            $handles      An array of handle dependencies.
	 *
	 * @return array
	 */
	public function search_dependencies( \WP_Dependencies $dependencies, $handles ) {
		$paths = [];
		foreach ( $handles as $handle ) {
			/**
			 * Dependency object.
			 *
			 * @var \_WP_Dependency $asset
			 */
			$asset = $dependencies->registered[ $handle ];
			if ( ! empty( $asset->src ) && is_string( $asset->src ) ) {
				$ver = $asset->ver;
				if ( ! $ver ) {
					$ver = $this->default_version;
				}
				$paths[] = add_query_arg( 'ver', $ver, $asset->src );
			}

			if ( ! empty( $asset->deps ) && is_array( $asset->deps ) ) {
				$deps  = $this->search_dependencies( $dependencies, $asset->deps );
				$paths = array_merge( $paths, $deps );
			}
		}

		return $paths;
	}

	/**
	 * Getter asset urls.
	 *
	 * @return array
	 */
	public function get_assets() {
		return $this->assets;
	}
}
