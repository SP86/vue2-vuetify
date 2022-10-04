export default {
  state: {
    importantNotificationsCount: 0,
    notifications:[],
    notificationsPagination: {
      current: 1,
      total: 0,
    },
  },
  mutations: {
    setImportantNotificationsCount: (state, count) => {
      state.importantNotificationsCount = count
    },
    setNotifications(state, {notifications}) {
      state.notifications = notifications
    },
    setNotificationPagination: (state, { current, total }) => {
      state.notificationsPagination.current = current
      state.notificationsPagination.total = total
    },
  },
  actions: {
    getImportantNotificationsCount({commit}) {
      axios.get('/admin/notifications/important/count').then((response)=>{
        commit('setImportantNotificationsCount', response.data.result)
      }).catch((error)=>{
        console.log(error, 'error in getImportantNotificationsCount')
      })
    },

    async fetchNotifications({commit, dispatch}, {category, page}) {
      console.log(category, 'fetchNotifications')
      await axios.get('/admin/notifications/'+category,{
        params: {
          page
        }
      }).then((response)=>{
        commit('setNotifications', { notifications: response.data.result.data })
        commit('setNotificationPagination', {
          current: response.data.result.current_page,
          total: response.data.result.last_page,
        })
        dispatch('getImportantNotificationsCount')
      }).catch((error)=>{
        console.log(error, 'error in fetchNotifications')
      })
    },

    async putReadState({commit}, {id_notification, page}) {
      console.log(id_notification,'id_notification')
      await axios.put('/admin/notifications?page='+page,
        {
          id_notification,
        }
      ).then((response)=>{
        console.log(response, 'putReadState')
        commit('setNotifications', { notifications: response.data.result.data })
        commit('setNotificationPagination', {
          current: response.data.result.current_page,
          total: response.data.result.last_page,
        })
      }).catch((error)=>{
        console.log(error, 'error in setReadState')
      })
    },
  },
  getters: {
    getCountImportantNotifications: state => state.importantNotificationsCount,
    getNotifications: state => state.notifications,
    getNotificationsPagination: state => state.notificationsPagination,
  }
}