import { sync } from 'vuex-router-sync';

import App from './App.vue';
import router from './router';
import store from './store';
import http from './http';
import auth from './auth';

import { wrapped } from './filter/formatter';
import 'babel-polyfill';
// import mavonEditor from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'
import { emoji } from './assets/js/emoji.js'
// import 'highlight.js/styles/hybrid.css'

Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})
// Vue.use(mavonEditor)
// var infiniteScroll =  require('vue-infinite-scroll');
// Vue.use(infiniteScroll)

http.config(Vue);
Vue.prototype.$http = http;
Vue.prototype.$emoji = emoji;
import utils from './utils'
Object.defineProperty(Vue.prototype, '$util', {
  value: utils,
  readable: true
})
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
