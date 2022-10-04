<template>
  <div>
    <div v-if="Object.keys(contractInfo).length">
      <v-btn icon @click="$router.push('/contracts')" class="mb-4">
        <v-icon class="headline">mdi-arrow-left</v-icon>
      </v-btn>
      <v-row align="center" class="mb-5">
        <v-col>
          <div class="px-3">
            <span class="headline mr-5">Контракт №{{contractInfo.id}} </span>
            <span class="headline mr-5" v-if="contractInfo.owner_object[0].title !== null">{{contractInfo.owner_object[0].title}} </span>
            <span class="headline" v-if="contractInfo.owner_object[0].country !== null">г. {{contractInfo.owner_object[0].country}}, </span>
            <span class="headline" v-if="contractInfo.owner_object[0].street !== null">ул. {{contractInfo.owner_object[0].street}}, </span>
            <span class="headline" v-if="contractInfo.owner_object[0].flat !== null">кв. {{contractInfo.owner_object[0].flat}} </span>
          </div>
        </v-col>
      </v-row>
      <v-row align="center" class="mb-5">
        <v-col cols="auto" class="mr-6" v-if="contractInfo.hasOwnProperty('consumer_id')">
          <div class="subtitle-1 px-3">Арендатор</div>
          <v-list-item
          >
            <v-avatar color="#1d2d42" class="mr-3" style="overflow: inherit;">
              <span class="white--text title" style="position: relative">{{contractInfo.consumer_id.first_name | firstCharF}}{{contractInfo.consumer_id.last_name | firstCharF}}</span>
              <span style="display: block; position: absolute; bottom: 0; right: 0;"></span>
            </v-avatar>
            <v-list-item-content>
              <div class="subtitle-1">{{contractInfo.consumer_id.first_name}} {{contractInfo.consumer_id.last_name}}</div>
              <div class="greyText--text subtitle-2">{{contractInfo.consumer_id.phone | phoneF}}</div>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col cols="auto" class="mr-6" v-if="contractInfo.hasOwnProperty('owner_id')">
          <div class="subtitle-1 px-3">Арендодатель</div>
          <v-list-item
          >
            <v-avatar color="#1d2d42" class="mr-3" style="overflow: inherit;">
              <span class="white--text title" style="position: relative">{{contractInfo.owner_id.first_name | firstCharF}}{{contractInfo.owner_id.last_name | firstCharF}}</span>
              <span style="display: block; position: absolute; bottom: 0; right: 0;"></span>
            </v-avatar>
            <v-list-item-content>
              <div class="subtitle-1">{{contractInfo.owner_id.first_name}} {{contractInfo.owner_id.last_name}}</div>
              <div class="greyText--text subtitle-2">{{contractInfo.owner_id.phone | phoneF}}</div>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
        <v-simple-table class="my-5">
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">Валюта</th>
            <th class="text-left">Месячная плата</th>
            <th class="text-left">Начало договора</th>
            <th class="text-left">Начало оплаты</th>
            <th class="text-left">Срок действия</th>
            <th class="text-left">Оплата каждого</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="subtitle-1">{{contractInfo.basic_currency | carrencyF}}</td>
            <td class="subtitle-1">{{contractInfo.monthly_fee}}</td>
            <td class="subtitle-1">{{contractInfo.start_of_contract | moment("DD.MM.YYYY")}}</td>
            <td class="subtitle-1">{{contractInfo.start_of_payment | moment("DD.MM.YYYY")}}</td>
            <td class="subtitle-1">{{contractInfo.validity | moment("DD.MM.YYYY")}}</td>
            <td class="subtitle-1">{{contractInfo.payment_for_each}} числа</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    name: 'ContractInfo',
    data: () => ({
      contractInfo: {},
      settingsWrap: false
    }),
    computed: {
      ...mapGetters(['getContract']),
    },
    methods: {
      ...mapActions(['fetchContract']),
    },
    async mounted() {
      await this.fetchContract(Number(this.$route.params.contractId))
      this.contractInfo = this.getContract
    }
  }
</script>
<style scoped>
  .theme--dark.v-data-table {
    background-color: transparent !important;
  }
</style>