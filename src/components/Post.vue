<template>

	<article>
		<PageHeader :title="post.title.rendered" :mediaId="post.featured_media">
			<template slot="meta" v-if="'post' === post.type">{{ post.date | dateFormat }}</template>
		</PageHeader>

		<div class="container body">
			<div class="categories">
				<post-categories :post-id="post.id" :link="true"></post-categories>
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
	import PageHeader from './PageHeader';

	export default {
		components: { PageHeader, User, PostAuthor, PostCategories, Media },
		props: {
			post: {
				featured_media: '',
				content: {
					rendered: ''
				},
				date: '',
				type: ''
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

	.body {
		position: relative;
		z-index: 1;
		padding: var(--gutter, 16px);
		background-color: #fff;
		margin-top: calc( var(--gutter, 16px) * -2);
	}

	.content {
		margin: var(--gutter, 16px) 0;
	}

	.content::after {
		content: '';
		display: table;
		clear: both;
	}

</style>
