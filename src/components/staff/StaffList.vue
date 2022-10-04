<template>
  <div class="py-4 py-md-0 fill-height d-flex flex-column">
    <div>
      <v-text-field
          v-model="search"
          class="mx-3"
          solo
          color="transparent"
          :elevation="0"
          dense
          prepend-inner-icon="mdi-magnify"
      ></v-text-field>
    </div>
    <v-list two-line color="transparent">
      <template v-for="(item, index) in filteredStaff">
        <v-list-item
            :key="item.user_roles.user_id"
            :to="'/staff/staff-'+item.user_roles.user_id">
          <v-list-item-content class="align-start">
            <v-list-item-title class="headline" v-html="item.user_roles.users.first_name"></v-list-item-title>
            <v-list-item-subtitle v-html="item.name"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <div class="px-3 px-md-0">
      <v-btn class="px-sm-6 mt-auto d-flex" color="info" elevation="0"
             to="/staff/create"
      >
        Создать персонал
      </v-btn>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    data: () => ({
      search: ''
    }),
    computed: {
      ...mapGetters(['getStaffList']),
      filteredStaff() {
        return this.getStaffList.filter((staff) => {
          return staff.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        })
      }
    },
    methods: {
      ...mapActions(['fetchStaffList']),
    },
    async mounted() {
      await this.fetchStaffList()
    }
  }
</script>