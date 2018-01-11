// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as util from './util'

Vue.config.productionTip = false

// console.log(`sum:${util.sum(4,6)}`);
// console.log(`minus:${util.minus(9,6)}`);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
