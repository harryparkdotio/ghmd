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

	function preventevent (e) { e.preventDefault(); e.stopPropagation(); };

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
		async mounted(){
			if (!this.content) {
				const contents = await this.getDefaultContent();
				this.$store.commit('content', contents.content);
				this.$store.commit('filename', contents.filename);
				this.$refs.editor.resize();
			}

			document.body.addEventListener('drop', this.dropFile);
			document.body.addEventListener('dragstart', preventevent);
			document.body.addEventListener('dragover', preventevent);
			document.body.addEventListener('dragenter', preventevent);
		},
		methods: {
			...mapActions([
				'getDefaultContent',
				'fetchContent',
				'clear'
			]),
			async dropFile(e) {
				preventevent(e);
				try {
					const file = e.dataTransfer.files[0];
					if (!(new RegExp(`(${markdownExtensions.join('|')})$`)).test(file.name)) {
						return;
					}

					const content = await this.fetchContent(window.URL.createObjectURL(file));

					this.$store.commit('content', content);
					this.$store.commit('filename', file.name);

					this.$refs.editor.resize();
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
