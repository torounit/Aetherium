<template>
	<h1>{{ title }}</h1>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		name: 'ArchiveTitle',
		computed: {
			...mapState({
				queriedObject: 'queriedObject'
			}),
			title() {
				let qm = this.queriedObject;
				if ( qm.name ) {
					return qm.name;
				}
				if ( qm.title && qm.title.rendered ) {
					return qm.title.rendered;
				}
			}
		}
	};
</script>

<style scoped>

</style>
