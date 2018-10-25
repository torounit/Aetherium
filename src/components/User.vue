<template>
	<router-link :to="user.link | path">
		<div class="user">
			<img class="avatar" :src="avatar" alt="">
			<div class="content">
				<h5 class="mt-0">{{ user.name }}</h5>
				<p>{{ user.description }}</p>
			</div>
		</div>
	</router-link>
</template>
<script>
export default {
	name: 'User',
	data() {
		return {
			user: {},
		};
	},
	props: {
		id: Number,
	},
	async created() {
		const model = new wp.api.models.User( { id: this.id } );
		this.user = await model.fetch();
	},
	computed: {
		avatar() {
			if ( this.user.avatar_urls ) {
				return this.user.avatar_urls[ '96' ];
			}
		},
	},
};
</script>

<style scoped>
	.user {
		display: flex;
		width: 100%;
		margin: 1em 0;
		background-color: #f2f2f2;
	}

	.avatar {
		margin-right: 0.5em;
	}

	.content {

	}

</style>
