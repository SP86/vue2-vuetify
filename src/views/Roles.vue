<template>
  <v-row class="roles fill-height">
    <v-col class="dark-bg d-none d-md-block" style="max-width: 300px;">
      <RolesList/>
    </v-col>
    <v-col class="px-md-10">
      <RoleEdit
          v-if="$route.params.roleId"
          :key="$route.params.roleId"/>
      <RoleCreate v-else />
    </v-col>
  </v-row>
</template>

<script>
  import {mapGetters} from 'vuex'
  import RolesList from '@/components/roles/RolesList.vue'
  import RoleCreate from '@/components/roles/RoleCreate.vue'
  import RoleEdit from '@/components/roles/RoleEdit.vue'
  export default {
    name: 'Roles',
    components: {
      RolesList,
      RoleCreate,
      RoleEdit
    },
    data () {
      return {
      }
    },
  }
</script>
