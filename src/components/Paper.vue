<template>
	<div class="paper">
		<slot name="paper-header" />
		<div class="paper-body">
			<slot />
		</div>
		<slot name="paper-footer" />
	</div>

</template>

<script>
export default {
	name: 'Paper',
};
</script>

<style scoped>
	.paper {
		height: 100%;
		background-color: #fff;
		overflow: hidden;
		box-shadow: 0 0.25rem 0.75rem rgba(0,0,0,.2);
	}

	.paper-body {
		margin: var(--gutter, 16px);
	}
</style>
