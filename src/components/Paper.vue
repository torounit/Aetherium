<template>
	<div class="paper">
		<slot name="media"></slot>
		<div class="paper__content">
			<slot></slot>
		</div>
	</div>

</template>

<script>
	export default {
		name: 'Paper'
	};
</script>

<style scoped>
	.paper {

		background-color: #fff;
		overflow: hidden;
		box-shadow: 0 0.25rem 0.75rem rgba(0,0,0,.2);
	}

	.paper__content {
		margin: var(--gutter, 16px);
	}
</style>
