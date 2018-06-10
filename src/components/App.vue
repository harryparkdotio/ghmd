<template>
	<div class='app'>
		<div class='container'>
			<Markdown :raw='content'/>
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
				content: ['# ghmd', 'an accurate github flavoured markdown preview', '```js', 'let a = 1;', 'let b = 2;', '', 'console.log(a + b) // 3', '```'].join('\n')
			}
		},
		components: {
			Markdown
		}
	};
</script>
