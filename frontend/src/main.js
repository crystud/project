import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faChartLine,
  faCheck,
  faHome,
  faTimes,
  faBars,
  faColumns,
  faPlus,
  faAngleLeft,
  faEdit,
  faEllipsisH,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'

import App from './App.vue'
import router from './router'
import store from './store'


import axios from './tools/axios'
import accessTokenExpired from './tools/accessTokenExpired'
import accessTokenHeader from './tools/accessTokenHeader'

accessTokenExpired(axios, store)
accessTokenHeader(axios, store)

library.add(faChartLine)
library.add(faCheck)
library.add(faHome)
library.add(faTimes)
library.add(faBars)
library.add(faColumns)
library.add(faPlus)
library.add(faAngleLeft)
library.add(faEdit)
library.add(faEllipsisH)
library.add(faTrash)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
