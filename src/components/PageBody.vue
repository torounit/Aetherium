<template>
	<div class="container">
		<div class="body">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	name: 'PageBody',
};
</script>

<style scoped>
	.body {
		position: relative;
		z-index: 1;
		margin-bottom: calc( var(--gutter, 16px) * 2);
	}
</style>
