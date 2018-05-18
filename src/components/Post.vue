<template>

  <article>
    <header>
      <h1 v-html="post.title.rendered"></h1>
      <post-categories :post-id="post.id"></post-categories>
    </header>
    <Media v-if="post.featured_media" :id="post.featured_media"></Media>
    <div class="content" v-html="post.content.rendered"></div>

    <User :id="post.author"></User>
  </article>
</template>

<script>
  import Media from "./Media";
  import PostCategories from "./PostCategories";
  import PostAuthor from "./PostAuthor";
  import User from "./User";
  export default {
    components: { User, PostAuthor, PostCategories, Media },
    props: {
      post: {},
    }
  }
</script>

<style scoped>

  header {
    margin: 1em 0;
  }

  .content::after {
    content: '';
    display: table;
    clear: both;
  }


</style>
