<template>
	<article class="card">
		<router-link :to="post.link | path">
			<Media v-if="post.featured_media" :id="post.featured_media"></Media>
		</router-link>

		<div class="body">
			<header>
				<h1 class="title"><router-link :to="post.link | path" v-html="post.title.rendered"></router-link></h1>
				<PostCategories :post-id="post.id" :link="true"></PostCategories>
			</header>
			<div class="content" v-html="post.excerpt.rendered"></div>
			<p><router-link :to="post.link | path">Read more</router-link></p>
		</div>
	</article>
</template>

<script>
	import Media from './Media';
	import PostCategories from './PostCategories';
	export default {
		name: 'PostCard',
		components: {
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
	.card {
		overflow: hidden;
		background-color: #fff;
		box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, .2);
	}

	.body {
		margin: var(--gutter, 16px);
	}

	.content {

	}

	.title {
		font-size: 20px;
	}

</style>
