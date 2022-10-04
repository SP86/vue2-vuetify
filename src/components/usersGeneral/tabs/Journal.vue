<template>
  <v-card
      color="lightBg"
      class="pa-3"
      flat
  >
    <v-overlay :value="getOverlay" :absolute="true" opacity="0.95">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <template v-if="journal.length">
    <v-card
        color="cardBlue"
        class="py-3 px-4 mb-4 d-flex flex-wrap align-center"
        flat
        v-for="(item, index) in journal"
        :key="index"
    >
      <div>
        <span class="body-2 greyTextLight--text">{{item.created_at | moment("DD.MM.YYYY hh:mm")}}</span>
        <div class="title">{{item.payload.message}}</div>
      </div>
      <!--<div class="ml-auto">
        <v-btn icon @click="">
          <v-icon class="headline mdi-36px">mdi-arrow-right-bold-circle-outline</v-icon>
        </v-btn>
      </div>-->
    </v-card>
    <div class="text-xs-center mt-3">
      <v-pagination
          v-model="getPagination.current"
          :length="getPagination.total"
          :total-visible="10"
      ></v-pagination>
    </div>
    </template>
    <template v-else>
      <v-card
          color="cardBlue"
          class="py-3 px-4 mb-4"
          flat
      >
        <div class="title">Записи отсутствуют</div>
      </v-card>
    </template>
  </v-card>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    props: {
      userId: {
        required: true
      },
    },
    name: 'UserJournal',
    data: () => ({
      overlay: false,
      dialog: false,
      journal:[],
    }),
    computed: {
      ...mapGetters(['getUserJournal', 'getOverlay', 'getPagination']),
    },
    methods: {
      ...mapActions(['fetchUserJournal']),
    },
    async mounted() {
      await this.fetchUserJournal(this.userId)
      this.journal = this.getUserJournal
    }
  }
</script>