<template>
  <router-link :to="user.link | path">
    <div class="media p-3 mb-5 mt-5 border border-info rounded">
      <img class="mr-3" :src="avatar" alt="">
      <div class="media-body">
        <h5 class="mt-0">{{ user.name }}</h5>
        <p>{{ user.description }}</p>
      </div>
    </div>
  </router-link>
</template>
<script>
  export default {
    name: 'User',
    data () {
      return {
        user: {}
      }
    },

    props: {
      id: {},
    },
    async created () {
      let model = new wp.api.models.User( { id: this.id } );
      this.user = await model.fetch();
    },
    computed: {
      avatar () {
        if (this.user.avatar_urls) {
          return this.user.avatar_urls[ '96' ]
        }

      }
    }
  }
</script>

<style scoped>

</style>
