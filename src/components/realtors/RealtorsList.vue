<template>
  <div>
    <v-overlay :value="listOverlay" :absolute="true" opacity="0.95">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <div v-if="getUsersByType.length">
      <v-row class="mb-3">
        <v-col cols="12" sm="6" md="4" lg="3" class="pa-sm-0 ma-sm-0">
          <v-text-field
              background-color="darkBg"
              solo
              :elevation="0"
              dense
              prepend-inner-icon="mdi-magnify"
              v-model="search"
              @input="getSearchResults"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="dark-bg">
        <v-col cols="col-12 col-sm-auto col-lg-4" v-for="(column, index) in columns" :key="index">
          <v-list two-line
                  color="transparent">
            <v-list-item v-for="(item) in column" v-if="column.length" :key="item.id"
                         :to="`/realtors/realtor-${item.id}`"
            >
              <v-avatar color="#1d2d42" class="mr-3" style="overflow: inherit;">
                <span class="white--text title" style="position: relative">{{item.first_name | firstCharF}}{{item.last_name | firstCharF}}</span>
                <span style="display: block; position: absolute; bottom: 0; right: 0;"></span>
                <v-icon class="headline mdi-36px" color="success" v-if="item.verified">mdi-checkbox-marked-circle</v-icon>
              </v-avatar>
              <v-list-item-content>
                <div class="subtitle-1">{{item.first_name}} {{item.last_name}} {{item.parent_name}}</div>
                <div class="greyText--text subtitle-2">{{item.phone}}</div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <div class="text-xs-center mt-3">
        <v-pagination
            v-model="getPagination.current"
            :length="getPagination.total"
            @input="getResults"
            :total-visible="10"
        ></v-pagination>
      </div>
    </div>
    <div v-else>
      <v-card
          color="cardBlue"
          class="py-3 px-4 mb-4"
          flat
      >
        Арендаторы не найдены
      </v-card>
    </div>
  </div>
</template>

<script>
  import GetUsersByType from '@/mixins/get-users-by-type.mixin'
  export default {
    mixins: [GetUsersByType],
    data () {
      return {
        type: 'realtor',
      }
    },
  }
</script>

<style scoped lang="scss">
  .v-avatar{
    overflow: inherit;
    .v-icon{
      position: absolute;
      right: -20px;
      bottom: -20px;
      &:before{
        font-size: 22px;
      }
    }
  }
</style>