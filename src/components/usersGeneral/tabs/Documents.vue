<template>
  <v-card
      color="lightBg"
      class="pa-3"
      flat
  >
    <v-overlay :value="getOverlay" :absolute="true" opacity="0.95">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <template v-if="documents.length">
      <v-row v-for="document in documents" :key="document.id">
        <v-col cols="auto">
        <div class="d-flex">
          <span class="headline mr-3">{{document.type | documentNameF}}</span>
          <v-btn
              text
              color="primary"
              @click="showImg(document)"
          >
            Просмотреть документ
          </v-btn>
        </div>
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <v-card
          color="cardBlue"
          class="py-3 px-4 mb-4"
          flat
      >
        <div class="title">Документы не найдены</div>
      </v-card>
    </template>

    <v-dialog
        v-model="dialog"
        max-width="800"
    >
      <v-card>
        <v-card-title class="headline">Фото документа</v-card-title>
        <v-card-text>
          <v-img class="mr-3" :src="uploadFile"></v-img>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              text
              @click="dialog = false"
          >
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
    name: 'UserDocuments',
    data: () => ({
      overlay: false,
      dialog: false,
      documents:[],
      uploadFile: ''
    }),
    computed: {
      ...mapGetters(['getUserDocuments', 'getImage', 'getOverlay']),
    },
    methods: {
      ...mapActions(['fetchUserDocuments', 'fetchImage']),
      async showImg(document){
        this.uploadFile = ''
        const image = await this.fetchImage(document.id)
        if(image.status === 200){
          let fileURL = window.URL.createObjectURL(new Blob([image.data]))
          this.uploadFile = fileURL
          setTimeout(() => {
            this.dialog = true
          }, 400)
        }
      }
    },
    async mounted() {
      await this.fetchUserDocuments(this.userId)
      this.documents = this.getUserDocuments
    }
  }
</script>