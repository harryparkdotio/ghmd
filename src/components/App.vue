<template>
	<div class='app'>
		<div class='container pane-container'>
			<Editor ref='editor'/>
			<Markdown/>
		</div>

		<footer>
			<a href='https://github.com/harryparkdotio/ghmd'><octicon name='mark-github' :height='25'/></a>
		</footer>
	</div>
</template>

<style lang='scss' src='@/assets/css/main.scss'></style>

<script>
	import { mapGetters, mapActions } from 'vuex';

	import Editor from '@/components/Editor';
	import Markdown from '@/components/Markdown';
	import octicon from '@/components/octicon';

	import markdownExtensions from 'markdown-extensions';

	const kille = (e) => { e.preventDefault(); e.stopPropagation(); };

	export default {
		name: 'App',
		computed: {
			...mapGetters([
				'content',
				'filename'
			])
		},
		data() {
			return {
				enabledrop: false
			};
		},
		mounted: async function() {
			let self = this;
			if (!this.content) {
				const contents = await this.getDefaultContent();
				this.$store.commit('content', contents.content);
				this.$store.commit('filename', contents.filename);
			}

			document.body.addEventListener('drop', async (e) => {
				kille(e);

				await self.dropFile(e);
				this.$refs.editor.resize();
			});

			document.body.addEventListener('dragstart', kille);
			document.body.addEventListener('dragover', kille);
			document.body.addEventListener('dragenter', kille);

			this.$refs.editor.resize();
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
					if (!(new RegExp(`(${markdownExtensions.join('|')})$`)).test(file.name)) {
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
			Editor,
			Markdown,
			octicon
		}
	};
</script>
