<template>
	<section class="archive">
		<page-header :title="title"></page-header>
		<page-body>
			<div class="posts">
				<post-card class="card" :post="post" v-for="post in posts" :key="post.id"></post-card>
			</div>
		</page-body>

		<pagination></pagination>

	</section>
</template>

<script>
	import { mapState } from 'vuex';
	import Pagination from './Pagination';
	import PostCard from './PostCard';
	import ArchiveTitle from './ArchiveTitle';
	import PageHeader from './PageHeader';
	import PageBody from './PageBody';

	export default {
		components: { PageBody, PageHeader, ArchiveTitle, PostCard, Pagination },
		computed: {
			...mapState({
				posts: 'posts',
				queriedObject: 'queriedObject'
			}),
			title() {
				let qm = this.queriedObject;
				if ( qm.name ) {
					return qm.name;
				}
				if ( qm.title && qm.title.rendered ) {
					return qm.title.rendered;
				}
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
	.title {
		font-size: 28px;
	}

	.card {
		margin: 0 0 var(--gutter, 16px);
	}

	@media (min-width: 600px) {
		.posts {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
		}
		.card {

			width: calc( calc(100% - var(--gutter, 16px) ) / 2 );
		}

	}

	@media (min-width: 900px) {
		.card {
			width: calc( calc(100% - calc( var(--gutter, 16px) * 2 ) ) / 3 );
		}
	}

</style>
