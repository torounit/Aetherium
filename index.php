<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<meta name="theme-color" content="#42b983">
	<?php if ( is_front_page() ): ?>
		<meta name="description" content="<?php bloginfo( 'description' ); ?>">
	<?php endif; ?>
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<div id="app"></div>


<script>
	if ( 'serviceWorker' in navigator ) {
		navigator.serviceWorker.register( '/?sw' )
	}
</script>
<script>
	if ( 'serviceWorker' in navigator ) {
		navigator.serviceWorker.register( '<?php echo get_theme_file_uri( 'sw-theme.js' );?>' )
	}
</script>
<?php wp_footer(); ?>
</body>
</html>
