<template>
	<img
		v-if="object.media_type"
		:src="object.source_url"
		:height="object.media_details.height"
		:width="object.media_details.width"
		alt="">
</template>

<script>
export default {
	name: 'Media',
	props: {
		id: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			object: {
				media_type: '',
				source_url: '',
				media_details: {
					file: '',
					height: 0,
					width: 0,
					image_meta: {},
					sizes: {
						thumbnail: {
							file: '',
							width: 0,
							height: 0,
							mime_type: '',
							source_url: '',
						},
					},
				},
			},
		};
	},
	mounted() {
		const media = new wp.api.models.Media( { id: this.id } );
		media.fetch().then( ( data ) => {
			this.object = data;
		} );
	},
};
</script>

<style scoped>
	img {
		width: 100%;
		display: block;
	}
</style>
