import {mapState, mapGetters, mapActions} from 'vuex'
export default {
  data () {
    return {
      usersLength: 0,
      listOverlay: true,
      search: '',
      cols: 3,
    }
  },
  computed: {
    ...mapGetters(['getUsersByType', 'getPagination']),
    columns () {
      let columns = []
      let mid = Math.ceil(this.getUsersByType.length / this.cols)
      for (let col = 0; col < this.cols; col++) {
        columns.push(this.getUsersByType.slice(col * mid, col * mid + mid))
      }
      return columns
    }
  },
  methods: {
    ...mapActions(['fetchUsersByType']),
    async getSearchResults(){
      this.listOverlay = true
      await this.fetchUsersByType({
        type: this.type,
        word: this.search,
      })
      this.listOverlay = false
    },
    async getResults(){
      this.listOverlay = true
      await this.fetchUsersByType({
        type: this.type,
        word: this.search,
        page: this.getPagination.current
      })
      this.listOverlay = false
    },
  },
  async mounted() {
    await this.fetchUsersByType({
      type: this.type,
      word: this.search,
      page: 1
    })

    this.listOverlay = false
  }
}