<template>
  <div>
    <h2 class="font-weight-regular mb-5">Новый Персонал</h2>
    <v-row>
      <v-col class="col-sm-10">
        <v-text-field
            v-model="name"
            class="subtitle-1"
            :error-messages="nameErrors"
            label="Имя, Фамилия"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
        ></v-text-field>
        <v-select
            v-model="role"
            class="subtitle-1"
            :items="getRolesList"
            item-text="name"
            item-value="id"
            :error-messages="selectErrors"
            label="Роль"
            @change="$v.role.$touch()"
            @blur="$v.role.$touch()"
        ></v-select>
        <v-text-field
            v-model="phone"
            class="subtitle-1"
            @blur="$v.phone.$touch()"
            :error-messages="phoneErrors"
            label="Телефон для входа"
            v-mask="phoneMask"
            placeholder="+380 00 000 00 00"
            hint="Телефон в формате +3XX XX XXX XX XX"
            persistent-hint
        />
        <v-text-field
            v-model="email"
            class="subtitle-1"
            :error-messages="emailErrors"
            label="E-mail"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
        ></v-text-field>
        <div class="d-flex flex-wrap justify-end">
          <v-btn class="mr-sm-5 mb-5 px-sm-12"
                 :class="{'caption':$vuetify.breakpoint.xsOnly}"
                 :block="$vuetify.breakpoint.xsOnly"
                 rounded
                 outlined
                 color="info"
                 elevation="0"
                 @click="clear"
                 >
            Отменить
          </v-btn>
          <v-btn class="px-sm-12 mb-5 order-first order-sm-last"
                 :class="{'caption':$vuetify.breakpoint.xsOnly}"
                 :block="$vuetify.breakpoint.xsOnly"
                 color="info"
                 elevation="0"
                 rounded
                 @click="create"
                 >
            Создать
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
  import {required, email, minLength} from 'vuelidate/lib/validators'
  import {mask} from 'vue-the-mask'
  import {mapGetters, mapActions} from 'vuex'
  import staffValidationMixin from '@/mixins/staff-validation.mixin'
  export default {
    name: 'StaffCreate',
    data () {
      return {
        phoneMask: '+380 ## ### ## ##',
        name: '',
        phone: '',
        email: '',
        role: null,
        roles: [
          {
            id: 1,
            title: 'Item 1'
          }
        ],
      }
    },
    mixins: [staffValidationMixin],
    directives: {
      mask,
    },
    validations: {
      name: {required},
      email: {required, email},
      role: {required},
      phone: {
        required,
        minLength: minLength(17)
      },
    },
    computed: {
      ...mapGetters(['getRolesList']),
    },
    methods: {
      ...mapActions(['fetchRolesList', 'createStaff', 'fetchStaffList']),
      async create(){
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        try {
          const staffData = {
            name: this.name,
            role_id: this.role,
            phone: this.phone.replace(/\+/g, " ").split(' ').join(''),
            email: this.email
          }
          const staff = await this.createStaff(staffData)
          await this.fetchStaffList()
          if (staff.data.hasOwnProperty('result')) {
            this.$router.push('/staff/staff-' + staff.data.result.id_user)
            this.$store.commit('setMsgSnackbar', {
              status: true,
              type: 'success',
              text: 'Персонал успешно создан'
            })
          }
        } catch (e) {
          console.log(e)
        }
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.phone = ''
        this.role = null
      },
    },
    async mounted() {
      await this.fetchRolesList()
    },
  }
</script>