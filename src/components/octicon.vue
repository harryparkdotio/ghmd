<template>
	<span :class='`octicon octicon-${name}`' v-html='icon'></span>
</template>

<script>
	import octicons from 'octicons';

	export default {
		name: 'octicon',
		computed: {
			opt() {
				let _opt = {};

				if (this.height) _opt.height = this.height;
				if (this.width) _opt.width = this.width;

				return _opt;
			},
			icon() {
				try {
					return octicons[this.name].toSVG(this.opt);
				} catch(err) {
					console.error(err);
				}
			}
		},
		props: {
			name: {
				type: String,
				required: true
			},
			height: {},
			width: {}
		}
	};
</script>
