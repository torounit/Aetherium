<template>
	<section class="archive">
		<page-header :title="title"></page-header>
		<page-body>
			<div class="archive-posts">
				<post-card class="archive-card" :post="post" v-for="post in posts" :key="post.id"></post-card>
			</div>
		</page-body>

		<pagination></pagination>

	</section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Pagination from './Pagination';
import PostCard from './PostCard';
import PageHeader from './PageHeader';
import PageBody from './PageBody';

export default {
	components: { PageBody, PageHeader, PostCard, Pagination },
	computed: {
		...mapGetters( {
			title: 'title',
		} ),
		...mapState( {
			posts: 'posts',
		} ),
	},
};
</script>

<style scoped>
	.archive-card {
		margin: 0 0 var(--gutter, 16px);
	}

	@media (min-width: 600px) {
		.archive-posts {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			margin-left: calc( var(--gutter, 16px) * -1 / 2);
			margin-right: calc( var(--gutter, 16px) * -1 / 2);
		}
		.archive-card {
			box-sizing: border-box;
			width: 50%;
			padding-left: calc(var(--gutter, 16px) / 2);
			padding-right: calc(var(--gutter, 16px) / 2);
		}
	}

	@media (min-width: 1200px) {
		.archive-card {
			width: 33.333333333%;
		}
	}

</style>
