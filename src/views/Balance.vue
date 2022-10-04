<template>
  <div class="row fill-height" style="position: relative">
    <v-overlay :value="balanceOverlay" opacity="0.95">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-col cols="12">
      <v-row>
        <v-col cols="12"><h1>Баланс: {{getBalance}} грн.</h1></v-col>
      </v-row>
      <v-row>
        <v-col class="col-auto">
          <v-select
              v-model="selectedTypes"
              :items="types"
              label="Тип операции"
              multiple
              persistent-hint
              solo
              :elevation="0"
              dense
              prepend-inner-icon="mdi-magnify"
          ></v-select>
        </v-col>
        <v-col class="col-auto">
          <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  background-color="darkBg"
                  v-model="dateRangeText"
                  label="Дата операции"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  solo
                  :elevation="0"
                  dense
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="dates"
                range
                @input="closeRange"
                color="primary"
                no-title
                locale="Ru-ru"
            >
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col class="col-auto">
          <v-btn color="info"
                 class="px-6"
                 @click="sortData"
                 :loading="filterBtnLoading"
                 :disabled="filterBtnLoading"
          >Применить</v-btn>
        </v-col>
      </v-row>
      <div style="position: relative">
        <v-simple-table class="my-5" v-if="getTransactions.length">
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">Тип операции</th>
              <th class="text-left">Дата/Время</th>
              <th class="text-left">ID<br/>Контракта</th>
              <th class="text-left">Месяц по<br/>договору</th>
              <th class="text-left">Валюта<br/>договора</th>
              <th class="text-left">Сума в<br/>валюте</th>
              <th class="text-left">Сума в<br/>грн</th>
              <th class="text-left">Карта<br/>отправителя</th>
              <th class="text-left">Отправитель</th>
              <th class="text-left">Карта<br/>получателя</th>
              <th class="text-left">Получатель</th>
              <th class="text-left">Статус</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="transaction in getTransactions" :key="transaction.id">
              <td class="subtitle-1">{{transaction.id}}</td>
              <td class="subtitle-1">{{transaction.type}}</td>
              <td class="subtitle-1">{{transaction.created_at | moment("DD.MM.YYYY HH:ss")}}</td>
              <td class="subtitle-1">{{transaction.contract_id}}</td>
              <td class="subtitle-1">{{transaction.month | moment("DD.MM.YYYY")}}</td>
              <td class="subtitle-1">{{transaction.currency}}</td>
              <td class="subtitle-1">{{transaction.currency_amount}}</td>
              <td class="subtitle-1">{{transaction.amount}}</td>
              <td class="subtitle-1">{{transaction.sender_card_pan_mask}}</td>
              <td class="subtitle-1">{{transaction.sender_name}}</td>
              <td class="subtitle-1">{{transaction.receiver_card_pan_mask}}</td>
              <td class="subtitle-1">{{transaction.receiver_name}}</td>
              <td class="subtitle-1"><v-icon class="headline mdi-36px" color="success" v-if="transaction.status === 'success'">mdi-checkbox-marked-circle</v-icon></td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>

      <div class="text-xs-center mt-3" v-if="getTransactions.length">
        <v-pagination
            v-model="getTransactionsPagination.current"
            :length="getTransactionsPagination.total"
            @input="getResults"
            :total-visible="10"
        ></v-pagination>
      </div>
    </v-col>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    data () {
      return {
        filterBtnLoading: false,
        balanceOverlay: true,
        tab: null,
        notificationType: 'all',
        //date: new Date().toISOString().substr(0, 10),
        dates: [this.$moment().startOf('month').format("YYYY-MM-DD"), this.$moment().endOf('month').format("YYYY-MM-DD")],
        dateFrom: null,
        dateTo: null,
        menu: false,
        selectedTypes: [],
        types: [
          'rent',
        ],
      }
    },
    computed: {
      ...mapGetters(['getBalance', 'getTransactions', 'getTransactionsPagination']),
      dateRangeText () {
        return this.dates.join(' ~ ')
      },
    },
    methods: {
      ...mapActions(['fetchBalance', 'fetchTransactions']),
      closeRange(){
        if(this.dates.length > 1){
          const newarr = this.dates.sort((a, b) => {
            return this.$moment(a).diff(b);
          });
          this.menu = false
        }
      },
      async sortData(){
        console.log('sortData')
        /*if (!this.selectedTypes.length) {
          console.log('error')
          this.$store.commit('setMsgSnackbar', {
            status: true,
            type: 'error',
            text: 'Выберите тип операции!'
          })
          return
        }*/
        this.filterBtnLoading = true
        this.dateFrom = this.dates[0]
        this.dateTo = this.dates[1]
        await this.getResults(1)
        this.filterBtnLoading = false
      },
      async getResults(page=null){
        this.balanceOverlay = true
        await this.fetchTransactions({
          types: this.selectedTypes,
          start_date: this.dateFrom,
          end_date: this.dateTo,
          page: page!==null? page : this.getTransactionsPagination.current
        })
        this.balanceOverlay = false
      }
    },
    async mounted() {
      await this.fetchBalance()
      await this.getResults()
      this.balanceOverlay = false
    }
  }
</script>