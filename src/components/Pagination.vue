<template>
  <p>
    <router-link v-if="route.params.page > 1" :to="prev">Prev</router-link>
    <router-link v-if="hasMore" :to="next">Next</router-link>
  </p>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    computed: {
      ...mapState( {
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

</style>
