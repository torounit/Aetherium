<template>
	<header class="header">
		<Media class="media" v-if="mediaId" :id="mediaId"></Media>
		<div class="headline container">
			<div class="meta">
				<slot name="meta"></slot>
			</div>
			<h1 class="title" v-html="title"></h1>
		</div>
	</header>
</template>

<script>
	import Media from './Media';
	export default {
		name: 'PageHeader',
		components: { Media },
		props: {
			title: '',
			mediaId: 0
		}
	};
</script>

<style scoped>
	.header {
		padding: 24px;
		background-color: #263238;
		color: #fff;
		position: relative;
		height: 50vh;
		min-height: 200px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-bottom: calc( var(--gutter, 16px) * -2);

	}

	.media {
		width: 100%;
		height: 100%;
		top:0;
		left: 0;
		position: absolute;
		object-fit: cover;
	}

	.headline {
		position: relative;
		z-index: 2;
		text-shadow: 1px 1px 5px rgba(51,51,51,.8);
	}

	.title {
		font-size: 28px;
		margin: 0;
	}

	.meta {
		margin: 0;
		display: flex;
		position: absolute;
		bottom: 100%;
		font-size: 12px;
	}
</style>
