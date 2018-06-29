<template>
	<p v-if="categories.length">
		Categories:
		<span v-for="category in categories" :key="category.id" class="category">
          <router-link :to="category.link | path">{{ category.name }}</router-link>
        </span>
	</p>
</template>

<script>
	export default {
		props: {
			postId: {}
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
	}
</style>
