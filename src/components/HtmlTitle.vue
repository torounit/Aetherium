<template>
	<title v-if="title"> {{ title }} - {{ siteName }}</title>
	<title v-else> {{ siteName }}</title>
</template>

<script>
	import { mapGetters, mapState } from 'vuex';
	export default {
		name: 'HtmlTitle',
		computed: {
			...mapGetters({
				title: 'title'
			}),
			...mapState({
				siteName: state => state.siteOption.name
			})
		}
	};
</script>

<style scoped>

</style>
