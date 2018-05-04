<template>
  <div class="posts">
    <div class="media item" v-for="post in posts"  :key="post.id">
      <div class="media-body small border-bottom">
        <h6>
          <router-link :to="post.link | path">{{ post.title.rendered }}</router-link>
        </h6>
        <p v-html="post.excerpt.rendered"></p>
      </div>
    </div>
    <p v-if="hasMore"><router-link :to="{ name: route.name, params: { endpoint: 'page', page: route.params.page ? route.params.page + 1 : 2  }}">Next</router-link></p>

  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    computed: {
      ...mapState( {
        posts: 'posts',
        route: 'route',
        hasMore: 'hasMore'
      }),
      nextlink() {

      }
    }
  }
</script>

<style scoped>
  .item {
    margin: 1rem 0;
  }

</style>
