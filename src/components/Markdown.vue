<template>
	<div id='Markdown' class='pane preview-pane' v-show='(!editor.enabled && !preview.enabled) || preview.enabled'>
		<h3 class='header'>
			<span>
				<octicon name='book'/>&nbsp;
				<input class='filename' :value='rawfilename' @input='updateFilename' @blur='blurFilename'/>
			</span>
			<span class='header-controls'>
				<a @click.prevent='toggle("editor")'><octicon name='code'/></a>
				<a @click.prevent='download'><octicon name='desktop-download'/></a>
				<a @click.prevent='clear'><octicon name='trashcan'/></a>
			</span>
		</h3>
		<article class='src markdown-body' v-html='compiled'></article>
	</div>
</template>

<style lang='scss' src='@/assets/css/syntax-highlighting.scss'></style>

<script>
	import { mapGetters, mapActions } from 'vuex';

	import octicon from '@/components/octicon';
	import Prism from '@/extensions/prism';

	import markdownExtensions from 'markdown-extensions';
	import Marked from 'marked';

	let highlighterCache = {};

	const makeFilename = (f) => {
		let fspl = f.replace(/^[\.]+|[\.]+$/g, '').split('.');
		if (!(new RegExp(`(${markdownExtensions.join('|')})$`)).test(fspl[fspl.length - 1].toLowerCase())) {
			return `${f}.md`;
		}
		return f;
	};

	Marked.setOptions({
		highlight: function(code, lang) {
			let entity = JSON.stringify({ code, lang });

			try {
				if (!highlighterCache[entity]) {
					highlighterCache[entity] = Prism.highlight(code, Prism.languages[lang]);
				}
			} catch(err) {
				console.error(err);
			}

			return highlighterCache[entity] || '';
		},
		gfm: true
	});

	export default {
		name: 'Markdown',
		computed: {
			...mapGetters([
				'content',
				'filename',
				'editor',
				'preview'
			]),
			compiled: function() {
				try {
					return Marked(this.content);
				} catch(err) {
					console.error(err);
				}
			}
		},
		data() {
			return {
				rawfilename: this.$store.getters.filename
			};
		},
		methods: {
			...mapActions([
				'toggle'
			]),
			download(e) {
				const blob = new Blob([this.content], { type: 'text/plain' });
				const anchor = document.createElement('a');

				anchor.style.display = 'none';
				anchor.download = makeFilename(this.filename);
				anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
				anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');

				document.body.appendChild(anchor);
				anchor.click();
				document.body.removeChild(anchor);
			},
			updateFilename(e) {
				this.$store.commit('filename', e.target.value.trim());
			},
			blurFilename(e) {
				if (!e.target.value.trim()) {
					e.target.value = this.filename;
				}
			},
			clear() {
				localStorage.removeItem('vuex');
				this.$store.dispatch('clear');
			}
		},
		components: {
			octicon
		}
	};
</script>
