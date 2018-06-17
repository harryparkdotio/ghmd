import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import Vue from 'vue';

OfflinePluginRuntime.install();

Vue.config.productionTip = false;

import store from '@/store';

import App from '@/components/App';

const vm = new Vue({
	el: document.body.insertBefore(document.createElement('app'), document.body.firstChild),
	store,
	render: h => h(App)
});
