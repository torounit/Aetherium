<template>
  <div class="posts">
    <div class="post" v-for="post in posts" :key="post.id">
      <h3><router-link :to="post.link | path" v-html="post.title.rendered"></router-link></h3>
      <div class="content" v-html="post.excerpt.rendered"></div>
    </div>

    <pagination></pagination>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Pagination from "./Pagination";

  export default {
    components: { Pagination },
    computed: {
      ...mapState( {
        posts: 'posts',
      } ),
    }
  }
</script>

<style scoped>

  h3 {
    font-size: 1em;
  }

  .content {
    color: #888;
    font-size: 0.8em;
  }

  .post {
    margin: 1rem 0;
  }

  .post + .post {
    border-top: 1px solid #eee;
  }

</style>
