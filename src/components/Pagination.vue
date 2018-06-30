<template>
	<div class="container">
		<div class="pagination">
			<router-link v-if="route.params.page > 1" :to="prev">Prev</router-link>
			<div class="pagination-spacer"></div>
			<router-link v-if="hasMore" :to="next">Next</router-link>
		</div>
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
		margin: calc( var(--gutter,16px) ) 0;
		display: flex;
		width: 100%;
	}

	.pagination-spacer {
		flex: 1 1 auto;
	}

</style>
