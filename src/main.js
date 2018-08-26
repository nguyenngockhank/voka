import {} from './helpers/obj'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import VueCountdown from '@xkeshi/vue-countdown';
Vue.component(VueCountdown.name, VueCountdown);

/// add bootstrap
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

var VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


new Vue({
  store,
  el: '#app',
  // render: h => h(App)
  router,
  components: { App },
  template: '<App/>'
});