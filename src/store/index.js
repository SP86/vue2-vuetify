import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import roles from './modules/roles'
import general from './modules/general'
import staff from './modules/staff'
import owners from './modules/owners'
import consumers from './modules/consumers'
import realtors from './modules/realtors'
import contracts from './modules/contracts'
import notifications from './modules/notifications'
import balance from './modules/balance'

import abilityPlugin from './plugins/ability'

Vue.use(Vuex)
import createPersistedState from 'vuex-persistedstate'
export default new Vuex.Store({
  modules: {
    auth,
    roles,
    general,
    staff,
    owners,
    realtors,
    consumers,
    contracts,
    notifications,
    balance
  },
  plugins: [
    createPersistedState({
      paths: ['auth.userAccessToken', 'auth.userRefreshToken', 'auth.userTokenType', 'auth.authenticated', 'auth.user', 'auth.adminData']
    }),
    abilityPlugin
  ],
  state: {
    msgSnackbar: {
      status: false,
      type: '',
      text: ''
    },
    btnLoading: false
  },
  mutations: {
    setMsgSnackbar (state, payload) {
      state.msgSnackbar.status = payload.status
      state.msgSnackbar.type = payload.type
      state.msgSnackbar.text = payload.text
    },
    setBtnLoadingState(state, payload) {
      state.btnLoading = payload
    },

  },
  actions: {
  }
})
