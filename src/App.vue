<template>
  <v-app>
    <component :is="layout">
      <router-view/>
    </component>
    <v-snackbar
        v-model="msgSnackbar.status"
        :timeout="Number(3000)"
        :color="msgSnackbar.type"
        top
    >{{msgSnackbar.text}}
        <v-btn
        text
        @click="msgSnackbar.status = false"
        >Закрыть
        </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'

export default {
  name: 'App',
  data: () => ({
    snack: true
  }),
  components: {
    EmptyLayout,
    MainLayout,
  },
  computed: {
    ...mapState({
      msgSnackbar: state => state.msgSnackbar,
    }),
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    },
  }
};
</script>
<style>
  .grey-bg {
    background-color: #1e2228;
  }
  .dark-bg{
    background-color: #171c22;
  }
</style>
