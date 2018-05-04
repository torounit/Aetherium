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
    <p>
      <router-link v-if="route.params.page > 1" :to="prev">Prev</router-link>
      <router-link v-if="hasMore" :to="next">Next</router-link>
    </p>

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
      } ),

      next () {
        let page = this.route.params.page ? parseInt(this.route.params.page) + 1 : 2;
        return {
          name: this.route.name,
          params: {
            endpoint: 'page',
            page: page
          }
        }
      },
      prev () {
        let page = this.route.params.page > 1 ? parseInt(this.route.params.page) - 1 : 1;
        return {
          name: this.route.name,
          params: {
            endpoint: 'page',
            page: page
          }
        }
      }
    }
  }
</script>

<style scoped>
  .item {
    margin: 1rem 0;
  }

</style>
