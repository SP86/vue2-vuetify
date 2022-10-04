export default {
  state: {
    consumers: [],
    consumersPagination: {
      current: 1,
      total: 0,
    },
    consumerContracts: []
  },
  mutations: {
    setConsumers: (state, { consumers }) => {
      state.consumers = consumers
    },
    setConsumerContracts: (state, { contracts }) => {
      state.consumerContracts = contracts
    },
    setPagination: (state, { current, total }) => {
      state.consumersPagination.current = current
      state.consumersPagination.total = total
    },
  },
  actions: {
    async fetchConsumers({commit}, page) {
      await axios.get('/admin/all-consumers',{
        params: {
          page
        }
      }).then((response)=>{
        //console.log(response, 'response.data.result')
        commit('setConsumers', { consumers: response.data.result.data })
        commit('setPagination', {
          current: response.data.result.current_page,
          total: response.data.result.last_page,
        })
      }).catch((error)=>{
        console.log(error, 'error in fetchConsumers')
      })
    },
    async fetchConsumerContracts({commit}, idConsumer) {
      await axios.get('/admin/get-consumer-contracts/'+idConsumer).then((response)=>{
        console.log(response, 'fetchConsumerContracts')
        commit('setConsumerContracts', { contracts: response.data.result })
      }).catch((error)=>{
        console.log(error, 'error in fetchConsumerContracts')
      })
    },
  },
  getters: {
    getConsumers: state => state.consumers,
    getConsumersPagination: state => state.consumersPagination,
    getConsumerContracts: state => state.consumerContracts,
  }
}