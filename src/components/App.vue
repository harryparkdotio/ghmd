<template>
	<div class='app' @drop.prevent='dropFile' @dragover.prevent @dragstart.prevent @dragenter.prevent @drag.prevent>
		<div class='container'>
			<Markdown/>
		</div>
	</div>
</template>

<style lang='scss' src='@/assets/css/main.scss'></style>

<script>
	import { mapGetters } from 'vuex';

	import Markdown from '@/components/Markdown';

	export default {
		name: 'App',
		created: async function() {
			if (!this.content) {
				await this.getDefaultContents();
			}
		},
		computed: {
			...mapGetters([
				'content',
				'filename'
			])
		},
		methods: {
			async dropFile(e) {
				try {
					const file = e.dataTransfer.files[0];
					if (!/\.(md|text|txt)$/.test(file.name)) {
						return;
					}

					const content = await this.fetchContents(window.URL.createObjectURL(file));

					this.$store.commit('content', content);
					this.$store.commit('filename', file.name);
				} catch(err) {
					console.log(err);
				}
			},
			async fetchContents(file) {
				const raw = await fetch(file).then(response => {
					if (!response.ok) {
						throw new Error(response.status);
					}
					return response;
				});

				const reader = raw.body.getReader();
				const uint8 = await reader.read();
				return new TextDecoder('utf-8').decode(uint8.value);
			},
			async getDefaultContents() {
				this.$store.commit('content', await this.fetchContents('https://raw.githubusercontent.com/harryparkdotio/ghmd/master/README.md'));
				this.$store.commit('filename', 'README.md');
			},
			clear() {
				this.$store.commit('content', '');
				this.$store.commit('filename', '');
			}
		},
		components: {
			Markdown
		}
	};
</script>
