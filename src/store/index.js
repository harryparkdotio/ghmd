import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import persistedState from 'vuex-persistedstate';

export default new Vuex.Store({
	state: {
		content: '',
		filename: ''
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
