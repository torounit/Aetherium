<template>
  <div id="app" class="bg-light">

    <div class="App ">

      <header class="App__header container">
        <site-name></site-name>
      </header>

      <div class="container">

        <div class="App__main">
          <template
            v-if="posts.length === 1 && (route.name === 'post' || route.name === 'page' || route.name === 'front-page')">
            <post :post="post" v-for="post in posts" :key="post.id"></post>
          </template>
          <template v-else>
            <archive></archive>
          </template>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import SiteName from './SiteName.vue'
  import Post from "./Post"
  import Archive from "./Archive"

  export default {
    components: {
      Archive,
      Post,
      SiteName,
    },
    created () {
      this.$store.dispatch( 'initialize' )
      this.$router.afterEach( () => {
        this.$store.dispatch( 'fetchPosts' )
      } )
    },
    computed: mapState( {
      posts: 'posts',
      route: 'route'
    } )
  }
</script>

<style>
  @import "~normalize.css/normalize.css";
  @import "../styles/alignments.css";
  @import "../styles/elements.css";
  @import "../styles/captions.css";
  @import "../styles/gallery.css";


</style>

<style scoped>

  .container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    max-width: 80%;
  }

  .App {
    background-color: #f2f2f2;
    padding-top: 60px;
    padding-bottom: 60px;
  }

  .App__main {
    margin: auto;
    padding: 60px;
    background-color: #fff;
  }

</style>
