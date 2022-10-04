<template>
  <div>
    <v-card
        color="#1d2d42"
    >
      <v-list two-line>
        <v-list-item
        >
          <v-list-item-avatar class="login-avatar">
            <v-img src="https://nwestco.com/wp-content/uploads/2016/08/13.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{getAdminData.info.first_name}}</v-list-item-title>
            <v-list-item-subtitle>
              <router-link to="/login" class="black-text" @click.prevent="logout" color="red--text">
                Выход
              </router-link>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
    <v-list dense>
      <v-list-item link
                   v-for="(link, i) in links"
                   :key="i"
                   :to="link.to"
                   v-if="$can(link.action, link.subject)">
        <v-list-item-content>
          <v-list-item-title class="subtitle-1 font-weight-regular">{{ link.text }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action v-if="link.to === '/notifications' && getCountImportantNotifications > 0" class="d-flex">
          <v-btn x-small fab color="error" dark><span class="body-2">{{getCountImportantNotifications}}</span></v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'MainLayout',
    data: () => ({
      notificationsCount: 2,
      links: []
    }),
    computed: {
      ...mapGetters(['getAdminData', 'getCountImportantNotifications']),
    },
    methods: {
      logout() {
        this.$store.commit('setUserAccessToken', {userAccessToken: null})
        this.$store.commit('setUserRefreshToken', {userRefreshToken: null})
        this.$store.commit('setUserTokenType', {userTokenType: null})
        this.$store.commit('setAdminRoleAttribute', [])
        this.$store.commit('setAuthenticated', false)
        this.$store.commit('setBtnLoadingState', false)
        this.$store.commit('setStep', 1)
      },
    },
  }
</script>
<style scoped>
  .login-avatar{
    height: 60px !important;
    min-width: 60px !important;
    width: 60px !important;
  }
</style>