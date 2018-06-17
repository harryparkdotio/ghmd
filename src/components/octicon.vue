<template>
	<span v-html='icon'></span>
</template>

<script>
	import octicons from 'octicons';

	export default {
		name: 'octicon',
		computed: {
			icon: function() {
				try {
					return octicons[this.name].toSVG();
				} catch(err) {
					console.error(err);
				}
			}
		},
		props: {
			name: {
				type: String,
				required: true
			}
		}
	};
</script>
