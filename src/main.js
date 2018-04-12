import Vue from 'vue';
import { sync } from 'vuex-router-sync';

import App from './App.vue';
import router from './router';
import store from './store';
import http from './http';
import auth from './auth';

import { wrapped } from './filter/formatter';
import 'babel-polyfill';
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad)

http.config(Vue);
Vue.prototype.$http = http;
auth.checkAuth();

Vue.filter('wrapped', wrapped);

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
