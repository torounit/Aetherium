<template>

	<article class="post">
		<PageHeader :title="post.title.rendered" :mediaId="post.featured_media">
			<template slot="meta" v-if="'post' === post.type">{{ post.date | dateFormat }}</template>
		</PageHeader>
		<PageBody>
			<paper>
				<div >
					<div class="post-meta">
						<post-categories :post-id="post.id" :link="true"></post-categories>
					</div>
					<div class="post-content" v-html="post.content.rendered"></div>
					<User :id="post.author"></User>
				</div>
			</paper>

		</PageBody>

	</article>
</template>

<script>
	import Media from './Media';
	import PostCategories from './PostCategories';
	import PostAuthor from './PostAuthor';
	import User from './User';
	import PageHeader from './PageHeader';
	import PageBody from './PageBody';
	import Paper from './Paper';

	export default {
		components: { Paper, PageBody, PageHeader, User, PostAuthor, PostCategories, Media },
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

	.post {
		position: relative;
	}

	.post-meta {
		position: absolute;
		top: 0;
		transform: translateY(-50%);
	}

	.post-content {
		margin: var(--gutter, 16px) 0;
	}

	.post-content::after {
		content: '';
		display: table;
		clear: both;
	}

</style>
