<template>
	<router-link to="/">{{ name }}</router-link>
</template>

<script>
	import {mapState} from 'vuex'

	export default {
		computed: mapState( {
			name: state => state.siteOption.name,
		} )
	}
</script>

<style scoped>

</style>
