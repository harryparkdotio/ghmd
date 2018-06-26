<template>
	<div id='Editor' class='pane editor-pane' v-show='editor.enabled'>
		<h3 class='header'>
			<span><octicon name='markdown'/>&nbsp;editor</span>
			<span class='header-controls'>
				<a @click.prevent='toggle("preview")'><octicon name='eye'/></a>
			</span>
		</h3>
		<article class='src'>
			<textarea ref='editor' v-model='rawcontent' @input='resize' autocomplete='off' spellcheck='false' autocapitalize='off' autocorrect='off'></textarea>
		</article>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	import octicon from '@/components/octicon';

	function getParentOverflows(el) {
		const arr = [];

		while (el && el.parentNode && el.parentNode instanceof Element) {
			if (el.parentNode.scrollTop) {
				arr.push({
					node: el.parentNode,
					scrollTop: el.parentNode.scrollTop,
				});
			}
			el = el.parentNode;
		}

		return arr;
	}

	const _ = {};

	_.now = Date.now || function(){
		return new Date().getTime();
	};

	_.debounce = function(func, wait, immediate) {
		let timeout, args, context, timestamp, result;

		let later = function() {
			let last = _.now() - timestamp;

			if (last < wait && last >= 0) {
				timeout = setTimeout(later, wait - last);
			} else {
				timeout = null;
				if (!immediate) {
					result = func.apply(context, args);
					if (!timeout) context = args = null;
				}
			}
		};

		return function() {
			context = this;
			args = arguments;
			timestamp = _.now();
			let callNow = immediate && !timeout;
			if (!timeout) timeout = setTimeout(later, wait);
			if (callNow) {
				result = func.apply(context, args);
				context = args = null;
			}

			return result;
		};
	};

	function scr(el) {
		el.node.scrollTop = el.scrollTop;
	}

	export default {
		name: 'Editor',
		computed: {
			...mapGetters([
				'content',
				'editor'
			]),
			rawcontent: {
				get() {
					return this.content;
				},
				set(val) {
					this.$store.commit('content', val);
				}
			}
		},
		data() {
			return {
				resize: _.debounce(() => {
					const el = this.$refs.editor;
					const offset = el.offsetHeight - el.clientHeight;
					requestAnimationFrame(() => {
						let of = getParentOverflows(el);
						el.style.height = '0';
						el.style.height = el.scrollHeight + offset + 'px';
						of.map(scr);
					}, 100);
				})
			};
		},
		mounted() {
			this.resize();
		},
		methods: {
			...mapActions([
				'toggle'
			])
		},
		components: {
			octicon
		}
	};
</script>
