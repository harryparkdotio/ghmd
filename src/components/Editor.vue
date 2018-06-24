<template>
	<div id='Editor' class='pane editor-pane' v-show='editor.enabled'>
		<h3 class='header'>
			<span><octicon name='markdown'/>&nbsp;editor</span>
			<span class='header-controls'>
				<a @click.prevent='toggle("preview")'><octicon name='eye'/></a>
			</span>
		</h3>
		<article class='src'>
			<textarea ref='editor' v-model='rawcontent'></textarea>
		</article>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	import octicon from '@/components/octicon';

	import autosize from 'autosize';

	export default {
		name: 'Editor',
		computed: {
			...mapGetters([
				'content',
				'editor'
			]),
			rawcontent: {
				get: function() {
					return this.content;
				},
				set: function(val) {
					this.$store.commit('content', val);
				}
			}
		},
		data() {
			return {
				el: {}
			};
		},
		mounted() {
			autosize(this.$refs.editor);
		},
		updated() {
			autosize(this.$refs.editor);
		},
		methods: {
			...mapActions([
				'toggle'
			]),
			resize() {
				autosize(this.$refs.editor);
			}
		},
		components: {
			octicon
		}
	};
</script>
