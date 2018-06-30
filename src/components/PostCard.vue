<template>
	<article class="card">
		<paper>
			<template slot="media">
				<router-link :to="post.link | path">
					<Media v-if="post.featured_media" :id="post.featured_media"></Media>
				</router-link>
			</template>

			<template>
				<div class="body">
					<header>
						<h1 class="title"><router-link :to="post.link | path" v-html="post.title.rendered"></router-link></h1>
						<PostCategories :post-id="post.id" :link="true"></PostCategories>
					</header>
					<div v-html="post.excerpt.rendered"></div>
					<p><router-link :to="post.link | path">Read more</router-link></p>
				</div>
			</template>



		</paper>
	</article>
</template>

<script>
	import Media from './Media';
	import PostCategories from './PostCategories';
	import Paper from './Paper';
	export default {
		name: 'PostCard',
		components: {
			Paper,
			PostCategories,
			Media
		},
		props: {
			post: {
				featured_media: '',
				title: {
					rendered: ''
				},
				excerpt: {
					rendered: ''
				},
				content: {
					rendered: ''
				}
			}
		}
	};
</script>

<style scoped>

	.title {
		font-size: 20px;
	}

</style>
