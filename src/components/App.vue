<template>
	<div id="app">
		<div class="app">
			<header class="app-navbar" :class="{ 'app-navbar--bg': scrollY > 0}">
				<site-name></site-name>
			</header>

			<div class="app-main">
				<template v-if="posts.length === 1 && singular.includes( templateType )">
					<post :post="post" v-for="post in posts" :key="post.id"></post>
				</template>
				<template v-else>
					<archive></archive>
				</template>
			</div>

		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import SiteName from './SiteName.vue';
	import Post from './Post';
	import Pagination from './Pagination';
	import Archive from './Archive';

	export default {
		components: {
			Archive,
			Post,
			SiteName,
			Pagination
		},
		created() {
			this.$store.dispatch( 'initialize' );
			this.$router.afterEach( () => {
				this.$store.dispatch( 'fetchPosts' );
			});

		},
		mounted() {
			this.onScroll();
			window.addEventListener( 'scroll', this.onScroll );
			window.addEventListener( 'resize', this.onScroll );
		},
		data() {
			return {
				scrollY: window.scrollY,
				singular: [
					'post',
					'page',
					'front-page'
				]
			};
		},
		computed: mapState({
			posts: 'posts',
			templateType: 'templateType'
		}),
		methods: {
			onScroll() {
				this.scrollY = window.scrollY;
			}
		}
	};
</script>

<style>
	@import "~normalize.css/normalize.css";
	@import "../styles/alignments.css";
	@import "../styles/elements.css";
	@import "../styles/captions.css";
	@import "../styles/gallery.css";

	:root {
		--gutter: 20px;
		--interaction-color: #42b983;
	}

	@media (min-width: 600px) {
		:root {
			--gutter: 24px;
		}
	}

	@media (min-width: 1000px) {
		:root {
			--gutter: 32px;
		}
	}

	.container {
		max-width: 1000px;
		width: 100%;
		padding-right: var(--gutter, 16px);
		padding-left: var(--gutter, 16px);
		margin-right: auto;
		margin-left: auto;
		box-sizing: border-box;
	}

</style>

<style scoped>


	.app {
		background-color: #f2f2f2;
		//padding: 60px 0;
	}

	.app-navbar {
		padding-right: 20px;
		padding-left: 20px;
		position: fixed;
		z-index: 5;
		top: 0;
		width: 100vw;
		box-sizing: border-box;
		transition: all 300ms ease-out 0ms;
		background-color: transparent;
	}

	.app-navbar--bg {
		background: rgba( 255, 255, 255, 0.75 );
	}

	.app-main {
		margin: auto;
		overflow: hidden;

	}

</style>
