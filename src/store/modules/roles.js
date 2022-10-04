export default {
  state: {
    roles: [],
    rolesList: [],
    role: {}
  },
  mutations: {
    setRoles: (state, { roles }) => {
      state.roles = roles
    },
    setRole: (state, { role }) => {
      state.role = role
    },
    setRolesList: (state, { rolesList }) => {
      state.rolesList = rolesList
    },
  },
  actions: {
    async fetchRoles({commit}) {
      await axios.get('/admin/roles').then((response)=>{
        commit('setRoles', { roles: response.data.result })
      }).catch((error)=>{
        console.log(error, 'error in fetchRoles')
      })
    },
    async fetchRolesList({commit}) {
      await axios.get('/admin/roles-name').then((response)=>{
        commit('setRolesList', { rolesList: response.data.result })
      }).catch((error)=>{
        console.log(error, 'error in fetchRolesList')
      })
    },
    async fetchRole({commit}, idRole) {
      await axios.get('/admin/roles/'+idRole).then((response)=>{
        commit('setRole', { role: response.data.result })
      }).catch((error)=>{
        console.log(error, 'error in fetchRole')
      })
    },
    async createRole({commit}, name) {
      return await axios.post('/admin/roles', {
        name
      })
    },
    async updateRoleAttribute({commit}, { id, status }) {
      return await axios.put('/admin/roles', {
        id,
        status
      })
    },
  },
  getters: {
    getRoles: state => state.roles,
    getRolesList: state => state.rolesList,
    getRole: state => state.role,
  }
}