<template>

	<article>
		<h1><router-link :to="post.link | path">{{ post.title.rendered }}</router-link></h1>
		<div v-html="post.content.rendered"></div>
	</article>
</template>

<script>
	export default {
		props: {
			post: {},
		},
		components: {

		},
		computed: {
		}
	}
</script>

<style scoped>

</style>
