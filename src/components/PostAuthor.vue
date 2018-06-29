<template>
	<p>Author:
		<router-link :to="user.link | path">{{ user.name }}</router-link>
	</p>
</template>

<script>
	export default {
		data() {
			return {
				user: {}
			};
		},
		props: {
			userId: {}
		},
		async created() {
			let model = new wp.api.models.User({ id: this.userId });
			this.user = await model.fetch();
		}
	};
</script>

<style scoped>

</style>
