<template>

	<article class="post">
		<PageHeader :title="post.title.rendered" :mediaId="post.featured_media">
			<template slot="meta" v-if="'post' === post.type">{{ post.date | dateFormat }}</template>
		</PageHeader>
		<PageBody>
			<paper>
				<div>
					<div class="post-meta">
						<div class="post-categories">
							<category v-for="category in post.categories" :key="category" :id="category"></category>
						</div>
					</div>
					<div class="post-content" v-html="post.content.rendered"></div>
					<PostAuthor :id="post.author"></PostAuthor>
				</div>
			</paper>
		</PageBody>
	</article>
</template>

<script>
import PostAuthor from './PostAuthor';
import PageHeader from './PageHeader';
import PageBody from './PageBody';
import Paper from './Paper';
import Category from './Category';

export default {
	components: { Category, Paper, PageBody, PageHeader, PostAuthor },
	props: {
		post: {
			type: Object,
			default: () => {
				return {
					featured_media: '',
					content: {
						rendered: '',
					},
					date: '',
					type: '',
				};
			},
		},
	},
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

	.post-categories {
		display: flex;
		align-items: center;
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
