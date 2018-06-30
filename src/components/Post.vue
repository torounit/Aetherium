<template>

	<article>
		<header class="header">
			<Media class="media" v-if="post.featured_media" :id="post.featured_media"></Media>
			<div class="headline">
				<div class="meta">
					<template v-if="post.post_type === 'post'">{{ post.date }}</template>
				</div>
				<h1 class="title" v-html="post.title.rendered"></h1>
			</div>
		</header>
		<div class="container">
			<div class="categories">
				<post-categories :post-id="post.id"></post-categories>
			</div>

			<div class="content" v-html="post.content.rendered"></div>
			<User :id="post.author"></User>
		</div>
	</article>
</template>

<script>
	import Media from './Media';
	import PostCategories from './PostCategories';
	import PostAuthor from './PostAuthor';
	import User from './User';

	export default {
		components: { User, PostAuthor, PostCategories, Media },
		props: {
			post: {
				featured_media: '',
				content: {
					rendered: ''
				},
				date: '',
				post_type: ''
			}
		}
	};
</script>

<style scoped>

	.header {
		padding: 24px;
		background-color: #263238;
		color: #fff;
		position: relative;
		height: 50vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.media {
		width: 100%;
		height: 100%;
		top:0;
		left: 0;
		position: absolute;
		object-fit: cover;
	}

	.headline {
		position: relative;
		z-index: 2;
		text-shadow: 1px 1px 5px rgba(51,51,51,.8);
	}

	.categories {
		margin: 1em 0;
	}

	.title {
		font-size: 28px;
		margin: 0;
	}

	.meta {
		margin: 0;
		display: flex;
		position: absolute;
		bottom: 100%;
		font-size: 12px;
	}

	.content::after {
		content: '';
		display: table;
		clear: both;
	}

</style>
