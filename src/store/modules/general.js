export default {
  state: {
    overlay: false,
    tabOverlay: false,
    userInfo: {},
    userJournal: [],
    userObjects:[],
    userDocuments:[],
    image: '',
    pagination: {
      current: 1,
      total: 0,
    },
    usersSearchResult: []
  },
  mutations: {
    setOverlay: (state, payload) => {
      state.overlay = payload
    },
    setTabOverlay: (state, payload) => {
      state.tabOverlay = payload
    },
    setUserInfo: (state, { user }) => {
      state.userInfo = user
    },
    setUserJournal: (state, { journal }) => {
      state.userJournal = journal
    },
    setUserObjects: (state, { objects }) => {
      state.userObjects = objects
    },
    setUserDocuments: (state, { documents }) => {
      state.userDocuments = documents
    },
    setImage: (state, { image }) => {
      state.image = image
    },
    setBasePagination: (state, { current, total }) => {
      state.pagination.current = current
      state.pagination.total = total
    },
    setUsersLists: (state, { usersList }) => {
      state.usersSearchResult = usersList
    },
  },
  actions: {
    async fetchUserInfo({commit}, id) {
      await axios.get('/admin/user-info/'+id).then((response)=>{
        commit('setUserInfo', { user: response.data.result })
      }).catch((error)=>{
        console.log(error, 'error in fetchUserInfo')
      })
    },

    async verifyUser({commit}, {verified, id_user}) {
      await axios.post('/admin/verification/', {
          verified,
          id_user
        }).then((response)=>{
        commit('setUserInfo', { user: response.data.result })
      }).catch((error)=>{
        console.log(error, 'error in fetchUserInfo')
      })
    },

    async updateUserPersonalData({commit}, {id, first_name, last_name, parent_name, email, phone, birthday, passport_serial, passport_data, passport_date, residence_permit, identification_code}) {
      return await axios.post('/admin/update-user/'+id, {
        first_name,
        last_name,
        parent_name,
        email,
        phone,
        birthday,
        passport_serial,
        passport_data,
        passport_date,
        residence_permit,
        identification_code
      })
    },

    async fetchUserJournal({commit}, idUser) {
      await axios.get('/admin/journal/'+idUser).then((response)=>{
        commit('setUserJournal', { journal: response.data.result })
      }).catch((error)=>{
        console.log(error, 'error in fetchUserJournal')
      })
    },

    async fetchUserObjects({commit}, id) {
      await axios.get('/admin/get-objects/'+id).then((response)=>{
        commit('setUserObjects', { objects: response.data.result })
      }).catch((error)=>{
        console.log(error, 'error in fetchUserObjects')
      })
    },

    async fetchUserDocuments({commit}, id) {
      await axios.get('/admin/get-documents/'+id).then((response)=>{
        commit('setUserDocuments', { documents: response.data.result })
      }).catch((error)=>{
        console.log(error, 'error in fetchUserDocuments')
      })
    },

    async fetchImage({commit}, id) {
      return await axios.get('/admin/download-image/'+id,{
          responseType: 'blob',
        })
    },

    async fetchUsersByType({commit}, {type, word, page}) {
      let url
      (word !== '') ? url = `/admin/search/${type}/${word}` : url = `/admin/search/${type}`
      console.log(word, url, page)
      await axios.get(url,
        {params: {page}}
      ).then((response)=>{
        commit('setUsersLists', { usersList: response.data.result.data })
        commit('setBasePagination', {
          current: response.data.result.current_page,
          total: response.data.result.last_page,
        })
      }).catch((error)=>{
        console.log(error, 'error in usersGlobalSearch')
      })
    },
  },
  getters: {
    getOverlay: state => state.overlay,
    getUserInfo: state => state.userInfo,
    getUserJournal: state => state.userJournal,
    getUserObjects: state => state.userObjects,
    getUserDocuments: state => state.userDocuments,
    getImage: state => state.image,
    getPagination: state => state.pagination,
    getUsersByType: state => state.usersSearchResult,
  }
}