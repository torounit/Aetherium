<template>
	<div id="app">
		<h1><site-name></site-name></h1>
		<template v-if="route.name == 'post' || route.name == 'page'">
			<post :post="post" v-for="post in posts"></post>
		</template>
		<template v-else>
			<ul>
				<li v-for="post in posts">
					<router-link :to="post.link | path">{{ post.title.rendered }}</router-link>
				</li>
			</ul>
		</template>

	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import SiteName from './SiteName.vue';
	import Post from "./Post";

	export default {
		components: {
			Post,
			SiteName,
		},
		created() {
			this.$store.dispatch('fetchSiteOption')
			this.$store.dispatch('fetchPosts')
			this.$router.afterEach(() => {
				this.$store.dispatch('fetchPosts')
			})


		},
		computed: mapState( {
			posts: 'posts',
			route: 'route'
		} )
	}
</script>

<style>
	@import '~bootstrap/dist/css/bootstrap.css';
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		//text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}

	a {
		color: #42b983;
	}
</style>
