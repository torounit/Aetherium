<template>

  <article>
    <header>
      <h1>{{ post.title.rendered }}</h1>
      <span v-if="author.name">Author: <router-link :to="author.link | path">{{ author.name }}</router-link></span>
      Categories: <span v-for="category in categories"><router-link :to="category.link | path">{{ category.name }}</router-link></span>
    </header>
    <div class="content" v-html="post.content.rendered"></div>
  </article>
</template>

<script>
  export default {
    data () {
      return {
        categories: [],
        author: {}
      }
    },
    props: {
      post: {},
    },
    created () {
      this.fetchMetaData()
    },
    updated () {
      this.fetchMetaData()
    },
    methods: {
      fetchMetaData() {
        let cats = new wp.api.collections.Categories();
        cats.fetch( { data: { post: this.post.id } } ).then( ( data ) => {
          this.categories = data;
        } );
        let user  = new wp.api.models.User( { id: this.post.author } ) ;
        user.fetch().then( ( data ) => {
          this.author = data;
        } );
      }
    }
  }
</script>

<style scoped>

  header {
    margin: 1em 0;
  }

</style>
