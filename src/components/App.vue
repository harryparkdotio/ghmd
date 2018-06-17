<template>
	<div class='app' @drop.prevent='dropFile' @dragover.prevent @dragstart.prevent @dragenter.prevent @drag.prevent>
		<div class='container'>
			<Markdown/>
		</div>
	</div>
</template>

<style lang='scss' src='@/assets/css/main.scss'></style>

<script>
	import { mapGetters, mapActions } from 'vuex';

	import Markdown from '@/components/Markdown';

	export default {
		name: 'App',
		created: async function() {
			if (!this.content) {
				const contents = await this.getDefaultContent();
				this.$store.commit('content', contents.content);
				this.$store.commit('filename', contents.filename);
			}
		},
		computed: {
			...mapGetters([
				'content',
				'filename'
			])
		},
		methods: {
			...mapActions([
				'getDefaultContent',
				'fetchContent',
				'clear'
			]),
			async dropFile(e) {
				try {
					const file = e.dataTransfer.files[0];
					if (!/\.(md|text|txt)$/.test(file.name)) {
						return;
					}

					const content = await this.fetchContent(window.URL.createObjectURL(file));

					this.$store.commit('content', content);
					this.$store.commit('filename', file.name);
				} catch(err) {
					console.log(err);
				}
			}
		},
		components: {
			Markdown
		}
	};
</script>
