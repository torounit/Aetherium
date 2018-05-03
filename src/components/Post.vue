<template>

  <article>
    <header>
      <h1>{{ post.title.rendered }}</h1>
      <p v-for="category in categories">{{ category.name }}</p>
    </header>
    <div v-html="post.content.rendered"></div>
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
    async created () {
      let categoriesCollection = new wp.api.collections.Categories();
      let categories = await categoriesCollection.fetch( { data: { post: this.post.id } } )
      this.categories = categories;
    }
  }
</script>

<style scoped>

</style>
