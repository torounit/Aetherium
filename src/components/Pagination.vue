<template>
	<div class="pagination">
		<router-link v-if="route.params.page > 1" :to="prev">Prev</router-link>
		<div class="pagination__spacer"></div>
		<router-link v-if="hasMore" :to="next">Next</router-link>
	</div>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		computed: {
			...mapState({
				route: 'route',
				hasMore: 'hasMore'
			}),
			next() {
				let page = this.route.params.page ? parseInt( this.route.params.page ) + 1 : 2;
				return {
					name: this.route.name,
					params: {
						endpoint: 'page',
						page: page
					}
				};
			},
			prev() {
				let page = 1 < this.route.params.page ? parseInt( this.route.params.page ) - 1 : 1;
				return {
					name: this.route.name,
					params: {
						endpoint: 'page',
						page: page
					}
				};
			}
		}
	};
</script>

<style scoped>
	.pagination {
		display: flex;
		width: 100%;
	}

	.pagination__spacer {
		flex: 1 1 auto;
	}

</style>
