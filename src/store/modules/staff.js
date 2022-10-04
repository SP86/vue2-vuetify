export default {
  state: {
    staffList: [],
    staff: {}
  },
  mutations: {
    setStaffList: (state, { staffList }) => {
      state.staffList = staffList
    },
    setStaff: (state, { staff }) => {
      state.staff = staff
    },
  },
  actions: {
    async fetchStaffList({commit}) {
      await axios.get('/admin/personal').then((response)=>{
        commit('setStaffList', { staffList: response.data.result })
      }).catch((error)=>{
        console.log(error, 'error in fetchStaffList')
      })
    },
    async fetchStaff({commit}, idUser) {
      await axios.get('/admin/personal/'+idUser).then((response)=>{
        commit('setStaff', { staff: response.data.result })
      }).catch((error)=>{
        console.log(error, 'error in fetchStaff')
      })
    },
    async createStaff({commit}, {name, role_id, phone, email}) {
      return await axios.post('/admin/personal', {
        name,
        role_id,
        phone,
        email
      })
    },
    async updateStaff({commit}, {id_user, name, role_id, phone, email}) {
      console.log(`id_user - ${id_user} name - ${name} role_id - ${role_id} phone - ${phone} email - ${email}`)
      return await axios.put('/admin/personal', {
        id_user,
        name,
        role_id,
        phone,
        email
      })
    },
    async staffDelete({commit}, role_id) {
      return await axios.delete('/admin/personal/'+role_id)
    },
  },
  getters: {
    getStaffList: state => state.staffList,
    getStaff: state => state.staff,
  }
}