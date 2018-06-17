<template>
	<div id='Markdown' class='Markdown'>
		<h3 class='header'>
			<span><octicon name='book'/>&nbsp;{{filename}}</span>
			<span><a @click.prevent='clear'><octicon name='trashcan'/></a></span>
		</h3>
		<article class='src markdown-body' v-html='compiled'></article>
	</div>
</template>

<style lang='scss' src='@/assets/css/syntax-highlighting.scss'></style>

<script>
	import { mapGetters, mapActions } from 'vuex';

	import octicon from '@/components/octicon';
	import Prism from '@/extensions/prism';

	import Marked from 'marked';

	let highlighterCache = {};

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
				'filename'
			]),
			compiled: function() {
				try {
					return Marked(this.content);
				} catch(err) {
					console.error(err);
				}
			}
		},
		methods: {
			...mapActions([
				'clear'
			])
		},
		components: {
			octicon
		}
	};
</script>
