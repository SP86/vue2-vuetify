<template>
  <div>
    <v-row
        align="start"
        justify="center"
        v-if="getContracts.length"
    >
      <v-card
          class="px-4 mb-4"
          flat
          rounded
          width="100%"
          v-for="(contract) in getContracts" :key="contract.id"
          :to="`/contracts/contract-${contract.id}`"
      >
        <v-row class="dark-bg px-4"  align="center">
          <v-col cols="auto" class="mr-4">
            <h3 class="headline">Контракт №{{contract.id}}</h3>
          </v-col>
          <v-col cols="auto" class="mr-4">
            <div class="body-2 greyTextLight--text text-center">Начало действия: {{contract.start_of_contract | moment("DD.MM.YYYY hh:mm")}}</div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="dark-bg px-4" align="center" >
          <v-col cols="auto" class="mr-5" v-if="contract.hasOwnProperty('consumer_id')">
            <v-row class="align-center pr-5" style="border-right:1px solid #fff">
              <v-col cols="auto" class="mr-4">
                <v-avatar color="#1d2d42" class="mr-3" style="overflow: inherit;">
                  <span class="white--text title" style="position: relative">{{contract.consumer_id.first_name | firstCharF}}{{contract.consumer_id.last_name | firstCharF}}</span>
                  <span style="display: block; position: absolute; bottom: 0; right: 0;"></span>
                </v-avatar>
              </v-col>
              <v-col cols="auto" class="mr-4">
                <h3 class="headline">{{contract.consumer_id.first_name}} {{contract.consumer_id.last_name}}</h3>
              </v-col>
              <v-col cols="auto" class="mr-auto">
                <v-btn color="darkBtn" class="subtitle-2">Арендатор</v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="auto" v-if="contract.hasOwnProperty('owner_id')">
            <v-row class="align-center">
              <v-col cols="auto" class="mr-4">
                <v-avatar color="#1d2d42" class="mr-3" style="overflow: inherit;">
                  <span class="white--text title" style="position: relative">{{contract.owner_id.first_name | firstCharF}}{{contract.owner_id.last_name | firstCharF}}</span>
                  <span style="display: block; position: absolute; bottom: 0; right: 0;"></span>
                </v-avatar>
              </v-col>
              <v-col cols="auto" class="mr-4">
                <h3 class="headline">{{contract.owner_id.first_name}} {{contract.owner_id.last_name}}</h3>
              </v-col>
              <v-col cols="auto" class="mr-auto">
                <v-btn color="darkBtn" class="subtitle-2">Арендодатель</v-btn>
              </v-col>
            </v-row>
          </v-col>

        </v-row>
      </v-card>
      <div class="text-xs-center mt-3">
        <v-pagination
            v-model="getPagination.current"
            :length="getPagination.total"
            @input="getResults"
            :total-visible="10"
        ></v-pagination>
      </div>
    </v-row>
    <v-row v-else>
      <v-card
          color="cardBlue"
          class="py-3 px-4 mb-4"
          flat
      >
        <div class="title">Контракты отсутствуют</div>
      </v-card>
    </v-row>

  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    data () {
      return {}
    },
    computed: {
      ...mapGetters(['getContracts', 'getPagination']),
    },
    methods: {
      ...mapActions(['fetchContracts']),
      async getResults(){
        await this.fetchContracts(this.getPagination.current)
      }
    },
    async mounted() {
      await this.fetchContracts(this.getPagination.current)
    }
  }
</script>
<style scoped>
  .contract-list-item {
    flex-wrap: wrap;
  }
  .contract-list-inner{
    display: flex;
    flex:1 1 100%;
  }
</style>