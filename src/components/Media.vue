<template>
	<img v-if="object.media_type" :src="object.source_url" alt="">
</template>

<script>
	export default {
		name: 'Media',
		props: {
			id: 0
		},
		data() {
			return {
				object: {
					media_type: '',
					source_url: ''
				}
			};
		},
		mounted() {
			let media = new wp.api.models.Media({ id: this.id });
			media.fetch().then( ( data ) => {
				this.object = data;
			});
		}
	};
</script>

<style scoped>
	img {
		width: 100%;
		display: block;
	}
</style>
