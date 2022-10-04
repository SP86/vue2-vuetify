<template>
  <v-dialog
      v-model="dialogState"
      max-width="450"
  >
    <v-card class="pa-6">
      <v-card-text class="headline text-center"><slot></slot></v-card-text>
      <v-card-actions class="d-flex flex-wrap justify-lg-space-between">
        <v-btn
            color="primary"
            rounded
            outlined
            elevation="0"
            class="px-12 mb-3"
            :class="{'caption':$vuetify.breakpoint.xsOnly}"
            text
            @click="$emit('cancelDialog')"
            :block="$vuetify.breakpoint.xsOnly"
        >
          Отменить
        </v-btn>

        <v-btn
            color="primary"
            class="px-12 mb-3 ml-0"
            :class="{'caption':$vuetify.breakpoint.xsOnly}"
            elevation="0"
            rounded
            :block="$vuetify.breakpoint.xsOnly"
            @click="$emit('submitDialog')"
        >
          Удалить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['state'],
    computed: {
      dialogState: {
        get () {
          return this.state
        },
        set (val) {
          this.$emit('cancelDialog')
        },
      }
    },
  }
</script>