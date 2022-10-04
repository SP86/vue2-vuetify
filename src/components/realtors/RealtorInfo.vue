<template>
  <div style="position: relative">
    <v-overlay :value="infoOverlay" :absolute="true" opacity="0.95">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <div v-if="getUserInfo.id !== null">
      <v-btn icon @click="$router.push('/realtors')" class="mb-4">
        <v-icon class="headline">mdi-arrow-left</v-icon>
      </v-btn>
      <v-row align="center" class="mb-5">
        <v-col cols="auto" class="mr-6">
          <v-avatar color="#1d2d42" height="60" width="60">
            <span class="white--text title" v-if="getUserInfo.first_name">{{getUserInfo.first_name | firstCharF}}{{getUserInfo.last_name | firstCharF}}</span>
            <v-icon class="headline mdi-36px" color="success" v-if="verifyState">mdi-checkbox-marked-circle</v-icon>
          </v-avatar>
        </v-col>
        <v-col cols="auto" class="mr-6">
          <h3 class="headline">{{getUserInfo.first_name}} {{getUserInfo.last_name}}</h3>
          <div class="lighten-2 blue-grey--text title" v-if="getUserInfo.phone">{{getUserInfo.phone | phoneF}}</div>
        </v-col>
        <v-col cols="auto" class="mr-auto">
          <v-btn color="white" light class="subtitle-2">Риелтор</v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn v-show="!settingsWrap" icon @click="settingsWrap = !settingsWrap">
            <v-icon class="display-1">mdi-dots-horizontal</v-icon>
          </v-btn>
          <div v-show="settingsWrap">
            <v-btn color="white" light class="subtitle-2 mr-3">Экспорт данных</v-btn>
            <v-btn color="white" light class="subtitle-2 mr-3">Отвязать карту</v-btn>
            <v-btn color="white" light class="subtitle-2 mr-3" >Заблокировать</v-btn>
            <v-btn color="info" small icon @click="settingsWrap = !settingsWrap">
              <v-icon class="display-1">mdi-close</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row class="dark-bg mb-3 py-2" align="center">
        <v-col cols="auto">
          <div class="lighten-2 blue-grey--text">14:11 8 февраля 2020</div>
          <div class="headline">Требуется верификация документов</div>
        </v-col>
        <v-col cols="auto" class="ml-sm-auto">
          <v-btn :color="!verifyState?'success':'error'" @click="verify" :loading="verifyBtnLoading" >
            <span v-if="verifyState">Снять верификацию</span>
            <span v-else>Верифицировать</span>
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-card
          color="cardBlue"
          class="py-3 px-4 mb-4"
          flat
      >
        Данные не подгрузились
      </v-card>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    name: 'RealtorInfo',
    data: () => ({
      infoOverlay: true,
      settingsWrap: false,
      verifyBtnLoading: false,
    }),
    computed: {
      ...mapGetters(['getUserInfo']),
      verifyState () {
        let state = false
        this.getUserInfo.verified === null || !this.getUserInfo.verified ? state = false : state = true
        return state
      }
    },
    methods: {
      ...mapActions(['fetchUserInfo', 'verifyUser']),
      async verify(){
        this.verifyBtnLoading = !this.verifyBtnLoading
        await this.verifyUser({
          verified: !this.verifyState,
          id_user: Number(this.$route.params.realtorId),
        })
        this.verifyBtnLoading = !this.verifyBtnLoading
      }
    },
    async mounted() {
      await this.fetchUserInfo(Number(this.$route.params.realtorId))
      this.infoOverlay = false
    }
  }
</script>
<style scoped lang="scss">
  .v-avatar{
    overflow: inherit;
    .v-icon{
      position: absolute;
      right: -24px;
      bottom: -24px;
      &:before{
        font-size: 24px;
      }
    }
  }
</style>