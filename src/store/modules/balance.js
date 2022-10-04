export default {
  state: {
    balance: null,
    transactions:[],
    transactionsPagination: {
      current: 1,
      total: 0,
    },
  },
  mutations: {
    setBalance: (state, {balance}) => {
      state.balance = balance / 10
    },
    setTransactions: (state, { transactions }) => {
      state.transactions = transactions
    },
    setTransactionsPagination: (state, { current, total }) => {
      state.transactionsPagination.current = current
      state.transactionsPagination.total = total
    },
  },
  actions: {
    async fetchBalance({commit}) {
      await axios.get('/admin/get-balance').then((response)=>{
        commit('setBalance', { balance: response.data.result })
       }).catch((error)=>{
        console.log(error, 'error in fetchBalance')
       })
    },
    async fetchTransactions({commit}, {types, start_date, end_date, page}) {
      await axios.get('/admin/payment-transactions/',{
        params: {
          types,
          start_date,
          end_date,
          page
        }
      }).then((response)=>{
        commit('setTransactions', { transactions: response.data.result.data })
        commit('setTransactionsPagination', {
          current: response.data.result.current_page,
          total: response.data.result.last_page,
        })
      }).catch((error)=>{
        console.log(error, 'error in fetchTransactions')
      })
    },
  },
  getters: {
    getBalance: state => state.balance,
    getTransactions: state => state.transactions,
    getTransactionsPagination: state => state.transactionsPagination,
  }
}