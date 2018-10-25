<template>
	<div id="app">
		<div class="app">
			<header class="app-navbar" :class="{ 'app-navbar--bg': scrollY > 30}">
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
import { mapState, mapActions } from 'vuex';
import SiteName from './SiteName.vue';
import Post from './Post';
import Archive from './Archive';

export default {
	components: {
		Archive,
		Post,
		SiteName,
	},
	created() {
		this.initialize();
		this.$router.afterEach( () => {
			this.fetchPosts();
		} );
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
				'front-page',
			],
		};
	},
	computed: mapState( [
		'posts',
		'templateType',
	] ),
	methods: {
		...mapActions( [
			'initialize',
			'fetchPosts',
		] ),
		onScroll() {
			this.scrollY = window.scrollY;
		},
	},
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

	@media (min-width: 800px) {
		:root {
			--gutter: 32px;
		}
	}

	@media (min-width: 1200px) {
		:root {
			--gutter: 48px;
		}
	}

	.container {
		max-width: 1600px;
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
		padding: 4px var(--gutter, 20px);
		position: fixed;
		z-index: 5;
		top: 0;
		width: 100vw;
		box-sizing: border-box;
		transition: all 300ms ease-out 0ms;
		background-color: transparent;

	}

	.app-navbar--bg {
	//background: rgba( 255, 255, 255, 0.5 ); opacity: 0;
	}

	.app-main {
		margin: auto;
		overflow: hidden;

	}

</style>
