<template>
	<div id='Markdown' class='Markdown'>
		<h3 class='header'>
			<span><octicon name='book'/>&nbsp;{{filename}}</span>
		</h3>
		<article class='src markdown-body' v-html='compiled'></article>
	</div>
</template>

<style lang='scss' src='@/assets/css/syntax-highlighting.scss'></style>

<script>
	import { mapGetters } from 'vuex';

	import octicon from '@/components/octicon';
	import Prism from '@/extensions/prism';
	import RemarkableEmoji from '@/extensions/remarkable-emoji';

	import Remarkable from 'remarkable';

	let highlighterCache = {};

	const md = new Remarkable({
		html: true,
		breaks: true,
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
		}
	});

	md.use(RemarkableEmoji);

	export default {
		name: 'Markdown',
		computed: {
			...mapGetters([
				'content',
				'filename'
			]),
			compiled: function() {
				try {
					return md.render(this.content);
				} catch(err) {
					console.error(err);
				}
			}
		},
		components: {
			octicon
		}
	};
</script>
