<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<meta name="theme-color" content="#42b983">
	<link rel="manifest" href="<?php echo home_url('?manifest'); ?>">
	<?php wp_head(); ?>

</head>
<body <?php body_class(); ?>>

<div id="app"></div>

<?php wp_footer(); ?>
<script>
	// Check that service workers are registered
	if ('serviceWorker' in navigator) {
		// Use the window load event to keep the page load performant
		window.addEventListener( 'load', () => {
			//navigator.serviceWorker.register( '/?sw' );
			//navigator.serviceWorker.register( '<?php echo get_theme_file_uri( 'sw-theme.js');?>' );
		} );
	}
</script>
</body>
</html>
