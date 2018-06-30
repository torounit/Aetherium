<template>
	<section class="archive">
		<header class="header">
			<archive-title class="title"></archive-title>
		</header>
		<div class="container">
			<div class="posts">
				<post-card class="card" :post="post" v-for="post in posts" :key="post.id"></post-card>
			</div>
		</div>
		<pagination></pagination>

	</section>
</template>

<script>
	import { mapState } from 'vuex';
	import Pagination from './Pagination';
	import PostCard from './PostCard';
	import ArchiveTitle from './ArchiveTitle';

	export default {
		components: { ArchiveTitle, PostCard, Pagination },
		computed: {
			...mapState({
				posts: 'posts'
			})
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

	.container {
		max-width: 1000px;
	}

	.posts {
		margin: 32px 0;
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
