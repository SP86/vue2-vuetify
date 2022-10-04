import Vue from 'vue'

import { abilitiesPlugin } from '@casl/vue'
import ability from './config/ability';
Vue.use(abilitiesPlugin, ability);
import { Can } from '@casl/vue'
Vue.component('Can', Can)

import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'



Vue.use(require('vue-moment'))

import firstCharFilter from '@/filters/firstChar.filter'
import phoneFilter from '@/filters/phone.filter'
import userTypeFilter from '@/filters/userType.filter'
import documentNameFilter from '@/filters/documentName.filter'
import carrencyFilter from '@/filters/carrency.filter'

Vue.use(Vuelidate)
import axios from './plugins/axios'
window.axios = require('axios')

Vue.config.productionTip = false

Vue.filter('firstCharF', firstCharFilter)
Vue.filter('phoneF', phoneFilter)
Vue.filter('userTypeF', userTypeFilter)
Vue.filter('documentNameF', documentNameFilter)
Vue.filter('carrencyF', carrencyFilter)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
