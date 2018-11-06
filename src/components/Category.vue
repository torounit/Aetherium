<template>
	<router-link class="category" :to="category.link | path">{{ category.name }}</router-link>
</template>

<script>
export default {
	props: {
		id: Number,
		link: Boolean,
	},
	data() {
		return {
			category: {},
		};
	},
	created() {
		this.fetchMetaData();
	},
	methods: {
		async fetchMetaData() {
			const model = new wp.api.models.Category( { id: this.id } );
			this.category = await model.fetch();
		},
	},
};
</script>

<style scoped>
	.category {
		margin-right: 0.3em;
		font-size: 12px;
		font-weight: bold;
		display: inline-block;
		white-space: nowrap;
		background-color: var(--interaction-color, #42b983);
		color: #FFF;
		padding: 0.2em 0.4em;
	}
</style>
