import router from '../../router/index.js'
export default {
  state: {
    step: 1,
    userAccessToken: null,
    userRefreshToken: null,
    userTokenType: null,
    authenticated: false,
    user: [],

    adminData: {
      userAccessToken: null,
      userRefreshToken: null,
      root: false,
      roleAttribute: [],
      info: {}
    }
  },
  mutations: {
    setStep(state, payload) {
      state.step = payload
    },
    setUserAccessToken(state, {userAccessToken}) {
      state.userAccessToken = userAccessToken
    },
    setUserRefreshToken(state, {userRefreshToken}) {
      state.userRefreshToken = userRefreshToken
    },
    setUserTokenType(state, {userTokenType}) {
      state.userTokenType = userTokenType
    },
    setUserData(state, {user}) {
      state.user = user
    },
    setAuthenticated(state, payload) {
      state.authenticated = payload
    },
    setAdminData(state, adminData) {
      state.adminData = adminData
    },
    setAdminRoot(state, payload) {
      state.adminData.root = payload
    },
    setAdminInfo(state, payload) {
      state.adminData.info = payload
    },
    setAdminRoleAttribute(state, payload) {
      state.adminData.roleAttribute = payload
    },
  },
  actions: {
    async checkMobile({commit}, phoneNumber) {
      return await axios.get('/check-mobile/' + phoneNumber)
    },
    async checkOtp({commit}, {code_otp, phone_number}) {
      await axios.post('/admin-check-otp', {
        code_otp,
        phone_number
      }).then(response => {      
        if (!response.data.user.roles.length){
          commit('setStep', 1)
          commit('setMsgSnackbar', {
            status: true,
            type: 'error',
            text: 'Вход не возможен! Этому пользователю не назначена роль'
          })
          return false
        }
        if (response.status === 200 && response.data.access_token !== '') {
          commit('setAuthenticated', true)
          commit('setUserAccessToken', {userAccessToken: response.data.access_token})
          commit('setUserRefreshToken', {userRefreshToken: response.data.refresh_token})
          commit('setUserTokenType', {userTokenType: response.data.token_type})

          commit('setAdminInfo', response.data.user)
          commit('setAdminRoot', response.data.user.roles[0].root)

          if (!response.data.user.roles[0].root) {
            let roleAttribute = []
            response.data.role[0].roles_user.role.registered_attributes.forEach(function (role) {
              if (role.status) {
                roleAttribute.push({action: 'read', subject: role.role_attribute_id.toString()})
              }
            })
            commit('setAdminRoleAttribute', roleAttribute)
          } else {
            commit('setAdminRoleAttribute', [{"action": "read", "subject": "all"}])
          }
          commit('setStep', 1)
          router.push('/' )
        } else {
          commit('setStep', 1)
          commit('setMsgSnackbar', {
            status: true,
            type: 'error',
            text: 'Что то пошло не так'
          })
          return false
        }
      }).catch(err => {
        console.log(err, 'err in auth')
        commit('setStep', 1)
        commit('setBtnLoadingState', false)
        commit('setMsgSnackbar', {
          status: true,
          type: 'error',
          text: `Что то пошло не так ошибка: ${err.message}`
        })
      })
    },
  },
  getters: {
    getStepState: state => state.step,
    getAuthenticatedState: state => state.authenticated,
    getUserAccessToken: state => state.userAccessToken,
    getUserAccessTokenType: state => state.userTokenType,
    getUserData: state => state.user,
    getAdminData: state => state.adminData,
  }
}