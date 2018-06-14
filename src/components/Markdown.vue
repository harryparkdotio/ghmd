<template>
	<div id='Markdown' class='Markdown'>
		<h3 class='header'>
			<svg class='octicon octicon-book' viewBox='0 0 16 16' version='1.1' width='16' height='16' aria-hidden='true'>
				<path fill-rule='evenodd' d='M3 5h4v1H3V5zm0 3h4V7H3v1zm0 2h4V9H3v1zm11-5h-4v1h4V5zm0 2h-4v1h4V7zm0 2h-4v1h4V9zm2-6v9c0 .55-.45 1-1 1H9.5l-1 1-1-1H2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h5.5l1 1 1-1H15c.55 0 1 .45 1 1zm-8 .5L7.5 3H2v9h6V3.5zm7-.5H9.5l-.5.5V12h6V3z'></path>
			</svg>&nbsp;{{filename}}
		</h3>
		<article class='src markdown-body' v-html='compiled'></article>
	</div>
</template>

<style lang='scss' src='@/assets/css/syntax-highlighting.scss'></style>

<script>
	import Prism from 'prismjs';
	import Remarkable from 'remarkable';

	const md = new Remarkable({
		html: true,
		breaks: true,
		langPrefix: 'language-',
		typographer: false,
		highlight: (code, lang) => {
			try {
				return Prism.highlight(code, Prism.languages[lang], lang);
			} catch(err) {
				console.error(`could not highlight lang-${lang}: ${err}`);
			}
		}
	});

	export default {
		name: 'Markdown',
		computed: {
			compiled: function() {
				try {
					return md.render(this.raw);
				} catch(err) {
					console.error(err);
				}
			}
		},
		methods: {
			updateRaw(e) {
				console.log(e);
			}
		},
		props: {
			filename: {
				type: String,
				default: 'README.md'
			},
			raw: {
				type: String,
				default: ''
			}
		}
	};
</script>
