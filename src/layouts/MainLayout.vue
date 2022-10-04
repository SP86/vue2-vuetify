<template>
  <div class="fill-height">
    <v-navigation-drawer
        v-model="drawer"
        color="#181c21"
        :width="300"
        app
    >
      <drawer></drawer>
    </v-navigation-drawer>
    <v-navigation-drawer
        v-if="$route.meta.sidebar && ($vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly)"
        v-model="drawerRight"
        app
        clipped
        right
    >
      <component :is="innerSidebar"></component>
    </v-navigation-drawer>
    <v-app-bar
        app
        clipped-right
        color="#1d2d42"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{$route.name}}</v-toolbar-title>
      <v-app-bar-nav-icon v-if="$route.meta.sidebar && ($vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly)" @click.stop="drawerRight = !drawerRight" class="ml-auto"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-content class="fill-height">
      <v-container
          class="fill-height px-md-6 grey-bg"
          fluid
      >
        <router-view />
      </v-container>
    </v-content>
  </div>
</template>

<script>
  import Drawer from '@/components/Drawer.vue'
  import RolesList from '@/components/roles/RolesList.vue'
  import StaffList from '@/components/staff/StaffList.vue'
  export default {
    name: 'MainLayout',
    data: () => ({
      drawer: true,
      drawerRight: false,
      right: false,
    }),
    components: {
      Drawer,
      RolesList,
      StaffList
    },
    computed: {
      innerSidebar() {
        return this.$route.meta.sidebar
      },
    },
  };
</script>