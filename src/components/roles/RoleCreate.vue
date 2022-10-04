<template>
  <div>
    <h2 class="font-weight-regular mb-5">Новая роль</h2>
    <v-row>
      <v-col class="col-12 col-sm-5 col-md-4 col-lg-3">
        <v-text-field
            v-model="roleTitle"
            @blur="$v.roleTitle.$touch()"
            label="Название роли"
            class="subtitle-1"
            :error-messages="roleTitleErrors"
            clearable
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn class="px-sm-12 my-5"
               :class="{'caption':$vuetify.breakpoint.xsOnly}"
               color="info"
               elevation="0"
               :block="$vuetify.breakpoint.xsOnly"
               rounded
               @click="create">
          Создать роль
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
  import {required} from 'vuelidate/lib/validators'
  import {mapActions} from 'vuex'
  export default {
    data () {
      return {
        dialog: false,
        roleTitle: ''
      }
    },
    validations: {
      roleTitle: {required},
    },
    computed: {
      roleTitleErrors () {
        const errors = []
        if (!this.$v.roleTitle.$dirty) return errors
        !this.$v.roleTitle.required && errors.push('Название роли обязательное поле')
        return errors
      },
    },
    methods: {
      ...mapActions(['createRole', 'fetchRoles']),
      async create(){
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        try {
          const roleData = {
            name: this.roleTitle,
            //roleLevels: this.roleLevels,
          }
          const role = await this.createRole(this.roleTitle)
          await this.fetchRoles()
          this.$router.push('/roles/role-' + role.data.result.role_id)
        } catch (e) {
          console.log(e)
        }
      }
    },
  }
</script>