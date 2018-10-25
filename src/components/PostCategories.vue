<template>
	<div v-if="categories.length" class="post-categories">
		<template v-if="link">
			<router-link
				v-for="category in categories"
				:key="category.id" class="post-categories-category"
				:to="category.link | path"
			>{{ category.name }}</router-link>
		</template>
		<template v-else>
			<span v-for="category in categories" :key="category.id" class="category">
				{{ category.name }}
			</span>
		</template>
	</div>
</template>

<script>
export default {
	props: {
		postId: Number,
		link: Boolean,
	},
	data() {
		return {
			categories: [],
		};
	},
	created() {
		this.fetchMetaData();
	},
	methods: {
		async fetchMetaData() {
			const collection = new wp.api.collections.Categories();
			this.categories = await collection.fetch( { data: { post: this.postId } } );
		},
	},
};
</script>

<style scoped>

	.post-categories {
		display: flex;
		align-items: center;
	}
	.post-categories-category {
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
