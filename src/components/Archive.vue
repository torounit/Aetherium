<template>
  <div class="posts">
    <div class="media item" v-for="post in posts" :key="post.id">
      <div class="media-body small border-bottom">
        <h6>
          <router-link :to="post.link | path">{{ post.title.rendered }}</router-link>
        </h6>
        <p v-html="post.excerpt.rendered"></p>
      </div>
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
  .item {
    margin: 1rem 0;
  }

</style>
