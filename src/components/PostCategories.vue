<template>
	<div v-if="categories.length">
		<template v-if="link">
			<span v-for="category in categories" :key="category.id" class="category">
				<router-link :to="category.link | path" >{{ category.name }}</router-link>
			</span>
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
		display: inline-block;
		background-color: #212529;
		color: #FFF;
		padding: 0.2em 0.4em;
	}
</style>
