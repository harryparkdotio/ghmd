import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import persistedState from 'vuex-persistedstate';

export default new Vuex.Store({
	state: {
		content: '',
		filename: ''
	},
	actions: {
		fetchContent: async (context, url) => {
			const raw = await fetch(url).then(response => {
				if (!response.ok) {
					throw new Error(response.status);
				}
				return response;
			});

			const reader = raw.body.getReader();
			const uint8 = await reader.read();
			return new TextDecoder('utf-8').decode(uint8.value);
		},
		getDefaultContent: async (context) => {
			const content = await context.dispatch('fetchContent', 'https://raw.githubusercontent.com/harryparkdotio/ghmd/master/README.md');
			return { content, filename: 'README.md' };
		},
		clear: (context) => {
			context.commit('content', '');
			context.commit('filename', '');
		}
	},
	mutations: {
		content(state, content) {
			state.content = content;
		},
		filename(state, filename) {
			state.filename = filename;
		}
	},
	getters: {
		content: (state) => {
			return state.content ? state.content : '';
		},
		filename: (state) => {
			return state.filename ? state.filename : 'README.md';
		}
	},
	plugins: [
		persistedState()
	]
});
