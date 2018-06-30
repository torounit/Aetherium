<template>
	<div v-if="categories.length">
		<template v-if="link">
			<router-link
				v-for="category in categories"
				:key="category.id" class="category"
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
			postId: {},
			link: false
		},
		data() {
			return {
				categories: []
			};
		},
		created() {
			this.fetchMetaData();
		},
		methods: {
			async fetchMetaData() {
				let collection = new wp.api.collections.Categories();
				this.categories = await collection.fetch({ data: { post: this.postId } });
			}
		}
	};
</script>

<style scoped>
	.category {
		margin-right: 0.3em;
		font-size: 12px;
		font-weight: bold;
		display: inline-block;
		background-color: var(--interaction-color, #42b983);
		color: #FFF;
		padding: 0.2em 0.4em;
	}
</style>
