<template>
	<div class="posts">
		<div class="media item" v-for="post in posts">
			<div class="media-body small border-bottom">
				<h6>
					<router-link :to="post.link | path">{{ post.title.rendered }}</router-link>
				</h6>
				<p v-html="post.excerpt.rendered"></p>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'

	export default {
		computed: mapState( {
			posts: 'posts',
			route: 'route'
		} )
	}
</script>

<style scoped>
	.item {
		margin: 1rem 0;
	}

</style>
