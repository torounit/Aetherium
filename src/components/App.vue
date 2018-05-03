<template>
  <div id="app" class="container App">

    <header class="App__header">
      <site-name></site-name>
    </header>

    <div class="App__main">
      <template v-if="route.name == 'post' || route.name == 'page'">
        <post :post="post" v-for="post in posts" :key="post.id"></post>
      </template>
      <template v-else>
        <archive></archive>
      </template>
    </div>

  </div>

</template>

<script>
  import {mapState} from 'vuex'
  import SiteName from './SiteName.vue';
  import Post from "./Post";
  import Archive from "./Archive";

  export default {
    components: {
      Archive,
      Post,
      SiteName,
    },
    created () {
      this.$store.dispatch( 'fetchSiteOption' )
      this.$store.dispatch( 'fetchPosts' )
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
  @import '~bootstrap/dist/css/bootstrap.css';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  //text-align: center; color: #2c3e50; margin-top: 60px;
  }

  a {
    color: #42b983;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .aligncenter {
    margin-bottom: 2em;
  }

  .alignleft {
    float: left;
    margin: 0 2em 0 0;
  }

  .alignright {
    float: right;
    margin: 0 0 0 2em;
  }

  .alignleft,
  .alignright {
    max-width: 50%;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }

</style>

<style scoped>

  .App__main {
    margin: 1rem 0;
  }

</style>
