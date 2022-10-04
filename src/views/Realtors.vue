<template>
  <v-row class="fill-height">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-col cols="12" class="px-md-6" v-if="!$route.params.realtorId">
      <RealtorsList />
    </v-col>
    <v-col cols="12" class="px-md-6" v-else>
      <RealtorInfo />
      <v-divider></v-divider>
      <v-sheet
          class="mx-auto"
          elevation="0"
      >
        <v-slide-group
            v-model="tabsBtnGroup"
            class="pa-4 grey-bg"
            mandatory
            :center-active="true"
        >
          <v-row justify="space-between">
            <v-slide-item
                v-slot:default="{ active, toggle }"
            >
              <v-col cols="auto">
                <v-btn
                    :color="active ? 'info' : 'darkBtn'"
                    class="px-6"
                    @click="toggle(), changeTab('tab-1')"
                >Личные данные</v-btn>
              </v-col>
            </v-slide-item>
            <v-slide-item
                v-slot:default="{ active, toggle }"
            >
              <v-col cols="auto">
                <v-btn
                    :color="active ? 'info' : 'darkBtn'"
                    class="px-6"
                    @click="toggle(), changeTab('tab-2')"
                >Журнал</v-btn>
              </v-col>
            </v-slide-item>
            <v-slide-item
                v-slot:default="{ active, toggle }"
            >
              <v-col cols="auto">
                <v-btn :color="active ? 'info' : 'darkBtn'"
                       class="px-6"
                       @click="toggle(), changeTab('tab-3')"
                >Платежи</v-btn>
              </v-col>
            </v-slide-item>
            <v-slide-item
                v-slot:default="{ active, toggle }"
            >
              <v-col cols="auto">
                <v-btn :color="active ? 'info' : 'darkBtn'"
                       class="px-6"
                       @click="toggle(), changeTab('tab-4')"
                >Объекты</v-btn>
              </v-col>
            </v-slide-item>
            <v-slide-item
                v-slot:default="{ active, toggle }"
            >
              <v-col cols="auto">
                <v-btn :color="active ? 'info' : 'darkBtn'"
                       class="px-6"
                       @click="toggle(), changeTab('tab-5')"
                >Контракты</v-btn>
              </v-col>
            </v-slide-item>
            <v-slide-item
                v-slot:default="{ active, toggle }"
            >
              <v-col cols="auto">
                <v-btn :color="active ? 'info' : 'darkBtn'"
                       class="px-6"
                       @click="toggle(), changeTab('tab-6')"
                >Данные</v-btn>
              </v-col>
            </v-slide-item>
          </v-row>
        </v-slide-group>
      </v-sheet>
      <v-tabs
          class="d-none"
          v-model="tab"
          background-color="lightBg"
          grow
      >
        <v-tab :href="`#tab-1`"></v-tab>
        <v-tab :href="`#tab-2`"></v-tab>
        <v-tab :href="`#tab-3`"></v-tab>
        <v-tab :href="`#tab-4`"></v-tab>
        <v-tab :href="`#tab-5`"></v-tab>
        <v-tab :href="`#tab-6`"></v-tab>
      </v-tabs>
      <v-tabs-items
          v-model="tab">
        <v-tab-item :value="'tab-1'"
                    transition="fade-transition"
                    reverse-transition="fade-transition">
          <PersonalData :user-id="$route.params.realtorId" :key="tab" />
        </v-tab-item>
        <v-tab-item :value="'tab-2'"
                    transition="fade-transition"
                    reverse-transition="fade-transition">
          <Journal :user-id="$route.params.realtorId" :key="tab"/>
        </v-tab-item>
        <v-tab-item :value="'tab-3'"
                    transition="fade-transition"
                    reverse-transition="fade-transition">
          <v-card
              color="cardBlue"
              class="py-3 px-4 mb-4"
              flat
          >
          <div class="title">Платежи отсутствуют</div>
          </v-card>
        </v-tab-item>
        <v-tab-item :value="'tab-4'"
                    transition="fade-transition"
                    reverse-transition="fade-transition">
          <Objects :user-id="$route.params.realtorId" :key="tab"/>
        </v-tab-item>
        <v-tab-item :value="'tab-5'"
                    transition="fade-transition"
                    reverse-transition="fade-transition">
          <Contracts :key="tab"/>
        </v-tab-item>
        <v-tab-item :value="'tab-6'"
                    transition="fade-transition"
                    reverse-transition="fade-transition">
          <v-card
              color="cardBlue"
              class="py-3 px-4 mb-4"
              flat
          >
            <div class="title">Данные отсутствуют</div>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-col>
  </v-row>
</template>
<script>
  import PersonalData from '@/components/usersGeneral/tabs/PersonalData.vue'
  import RealtorsList from '@/components/realtors/RealtorsList.vue'
  import RealtorInfo from '@/components/realtors/RealtorInfo.vue'
  import Journal from '@/components/usersGeneral/tabs/Journal.vue'
  import Objects from '@/components/usersGeneral/tabs/Objects.vue'
  import Contracts from '@/components/realtors/tabs/Contracts.vue'
  import Documents from '@/components/usersGeneral/tabs/Documents.vue'
  export default {
    name: 'Realtors',
    components: {
      PersonalData,
      RealtorsList,
      RealtorInfo,
      Journal,
      Objects,
      Contracts,
      Documents
    },
    data: () => ({
      overlay: false,
      tabsBtnGroup: null,
      tab: null,
    }),
    computed: {
      activeTab(){
        return this.test
      }
    },
    methods: {
      changeTab(val){
        console.log(val)
        this.tab = val
      },
    },
    watch: {
      tab(){
        switch (this.tab) {
          case 'tab-1':
            this.tabsBtnGroup = 0;
            break;
          case 'tab-2':
            this.tabsBtnGroup = 1;
            break;
          case 'tab-3':
            this.tabsBtnGroup = 2;
            break;
          case 'tab-4':
            this.tabsBtnGroup = 3;
            break;
          case 'tab-5':
            this.tabsBtnGroup = 4;
            break;
          case 'tab-6':
            this.tabsBtnGroup = 5;
            break;
        }
      }
    },
    mounted() {
      /*setTimeout(() => {
        this.overlay = false
      }, 500)*/
    }
  }
</script>
<style scoped>
  .theme--dark.v-tabs-items {
    background-color: transparent !important;
  }
</style>