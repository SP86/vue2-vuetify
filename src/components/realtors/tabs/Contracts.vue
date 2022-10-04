<template>
  <v-card
      color="lightBg"
      class="pa-3"
      flat
  >
    <template v-if="realtorContracts.length">
      <v-card
          color="cardBlue"
          class="py-3 px-4 mb-4"
          flat
          v-for="contract in realtorContracts"
          :key="contract.id"
      >
        <div class="d-flex flex-wrap align-center">
          <div class="mb-auto mr-4 mt-2">
            <v-icon class="headline mdi-48px">mdi-file-document</v-icon>
          </div>
          <div>
            <div class="body-2 greyTextLight--text mb-3 mt-3 mt-sm-0">{{contract.start_of_contract | moment("DD.MM.YYYY hh:mm")}}</div>
            <div v-if="Object.keys(contract.owner_object[0]).length">
              <div class="title font-weight-regular mr-5">{{contract.owner_object[0].title}}</div>
              <div class="d-flex">
                <div class="mr-6">
                  <div v-if="contract.owner_object[0].country !== null"><span class="greyTextLight--text">Город: </span><span class="subtitle-1">{{contract.owner_object[0].country}}</span></div>
                  <div v-if="contract.owner_object[0].flat !== null"><span class="greyTextLight--text">Квартира №: </span><span class="subtitle-1">{{contract.owner_object[0].flat}}</span></div>
                </div>
                <div>
                  <div v-if="contract.owner_object[0].street !== null"><span class="greyTextLight--text">Улица: </span><span class="subtitle-1">{{contract.owner_object[0].street}}</span></div>
                  <div v-if="contract.owner_object[0].floor !== null"><span class="greyTextLight--text">Этаж: </span><span class="subtitle-1">{{contract.owner_object[0].floor}}</span></div>
                </div>
              </div>
            </div>
            <div class="d-flex flex-wrap align-end" v-if="contract.owner_id !== null">
              <div class="title font-weight-regular mr-5">Арендодатель: </div>
              <div class="subtitle-1 greyTextLight--text mr-5">{{contract.owner_id.first_name}} {{contract.owner_id.last_name}}</div>
              <div class="subtitle-1">
                <span class="error--text" v-if="contract.subscribe_status_owner === null">контракт не подписал!</span>
                <span class="lighten-2 success--text"  v-else>контракт подписал</span>
              </div>
            </div>
            <div class="d-flex flex-wrap align-end" v-if="Object.keys(contract.consumer_id).length">
              <div class="title font-weight-regular mr-5">Арендатор: </div>
              <div class="subtitle-1 greyTextLight--text mr-5">{{contract.consumer_id.first_name}} {{contract.consumer_id.last_name}}</div>
              <div class="subtitle-1">
                <span class="error--text" v-if="contract.subscribe_status_consumer === null">контракт не подписал!</span>
                <span class="lighten-2 success--text"  v-else>контракт подписал</span>
              </div>
            </div>
            <div class="d-flex flex-wrap align-end" v-if="contract.basic_currency !== null">
              <div class="title font-weight-regular mr-5">Валюта: </div>
              <div class="subtitle-1 greyTextLight--text mr-5">{{contract.basic_currency | carrencyF}}</div>
            </div>
          </div>
          <div class="ml-auto">
            <v-btn icon @click="$router.push('/contracts/contract-'+contract.id)">
              <v-icon class="headline mdi-36px">mdi-arrow-right-bold-circle-outline</v-icon>
            </v-btn>
          </div>
        </div>
      </v-card>
    </template>
    <template v-else>
      <v-card
          color="cardBlue"
          class="py-3 px-4 mb-4"
          flat
      >
        <div class="title">Контракты не найдены</div>
      </v-card>
    </template>
  </v-card>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  export default {
    name: 'RealtorContracts',
    data: () => ({
      realtorContracts: []
    }),
    computed: {
      ...mapGetters(['getRealtorContracts']),
    },
    methods: {
      ...mapActions(['fetchRealtorContracts']),
    },
    async mounted() {
      await this.fetchRealtorContracts(Number(this.$route.params.realtorId))
      this.realtorContracts = this.getRealtorContracts
    }
  }
</script>