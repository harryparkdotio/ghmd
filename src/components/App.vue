<template>
	<div class='app' @drop='dragFile' @dragover='dragFile'>
		<div class='container'>
			<Markdown :raw='content' :filename='filename'/>
		</div>
	</div>
</template>

<style lang='scss' src='@/assets/css/main.scss'></style>

<script>
	import Markdown from '@/components/Markdown';

	export default {
		name: 'App',
		data() {
			return {
				content: ['# ghmd', 'an accurate github flavoured markdown preview', '```js', 'let a = 1;', 'let b = 2;', '', 'console.log(a + b) // 3', '```'].join('\n'),
				filename: 'README.md'
			}
		},
		created() {
			if (localStorage.Markdown) {
				const Mark = JSON.parse(localStorage.getItem('Markdown'));
				this.filename = Mark.filename;
				this.content = Mark.content;
			}
		},
		methods: {
			async dragFile(e) {
				e.preventDefault();
				try {
					const fileObj = e.dataTransfer.files[0];
					if (!/\.(md|text|txt)$/.test(fileObj.name)) {
						return;
					}
					this.filename = fileObj.name;
					const rawContents = await fetch(window.URL.createObjectURL(fileObj));
					const reader = rawContents.body.getReader();
					const uint8 = await reader.read();
					const data = new TextDecoder("utf-8").decode(uint8.value);
					this.content = data;
					this.save();
				} catch(err) {
					console.error(err);
				}
			},
			save(filename, content) {
				if (!filename) {
					filename = this.filename;
				}
				if (!content) {
					content = this.content;
				}
				localStorage.Markdown = JSON.stringify({ filename, content});
			}
		},
		components: {
			Markdown
		}
	};
</script>
