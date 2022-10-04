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
    <v-list color="transparent">
      <template v-for="(item, index) in filteredRoles">
        <v-list-item
            :key="item.id"
            :to="'/roles/role-'+item.id">
          <v-list-item-content class="align-start">
            <v-list-item-title class="headline" v-html="item.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <div class="px-3 px-md-0">
      <v-btn class="px-sm-6 mt-auto d-flex" color="info" elevation="0"
             :block="$vuetify.breakpoint.xsOnly"
             to="/roles/create"
             >
        Создать роль
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
      ...mapGetters(['getRoles']),
      filteredRoles() {
        return this.getRoles.filter((role) => {
          return role.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        })
      }
    },
    methods: {
      ...mapActions(['fetchRoles']),
      async getResults(){
        await this.fetchRoles()
      }
    },
    async mounted() {
      await this.fetchRoles()
    }
  }
</script>