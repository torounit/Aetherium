<template>
  <h1>
    <router-link to="/">{{ name }}</router-link>
  </h1>
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: mapState({
    name: state => state.siteOption.name
  })
}
</script>

<style scoped>
  h1 {
    font-size: 1.2rem;
  }

</style>
