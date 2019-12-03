<template>
	<p>Author: <router-link :to="user.link | path">{{ user.name }}</router-link></p>
</template>

<script>
export default {
	data() {
		return {
			user: {},
		};
	},
	props: {
		id: Number,
	},
	async mounted() {
		if ( this.id ) {
			const model = new wp.api.models.User( { id: this.id } );
			this.user = await model.fetch();
		}
	},
};
</script>

<style scoped>

</style>
