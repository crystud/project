import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from './tools/axios'
import accessTokenExpired from './tools/accessTokenExpired'
import accessTokenHeader from './tools/accessTokenHeader'

accessTokenExpired(axios, store)
accessTokenHeader(axios, store)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
