<template>
  <v-container
      class="fill-height"
      fluid
  >
    <v-row
        align="center"
        justify="center"
    >
      <v-col
          cols="12"
          sm="8"
          md="4"
      >
        <v-card class="elevation-12 pa-6">
          <div v-show="getStepState===1">
            <h3 class="font-weight-regular pt-3 pl-3">Введите Ваш номер</h3>
            <v-card-text>
              <v-form>
                <input type="hidden" v-model="phone" v-mask="phoneMask"/>
                <v-text-field
                    class="display-1"
                    name="login"
                    v-model="phone"
                    v-mask="phoneMask"
                    placeholder="+38(000) 000 00 00"
                    persistent-hint
                    @blur="$v.phone.$touch()"
                    :error-messages="phoneErrors"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary"
                     @click="submitPhone"
                     rounded
                     class="px-6 text-capitalize"
                     :loading="$store.state.btnLoading">Далее</v-btn>
            </v-card-actions>
          </div>
          <div v-show="getStepState===2">
            <h3 class="font-weight-regular pt-3 pl-3">Введите код из SMS</h3>
            <v-card-text>
              <v-form>
                <input type="hidden" v-model="sms" v-mask="smsMask"/>
                <v-text-field
                    class="display-1"
                    name="sms"
                    v-model="sms"
                    v-mask="smsMask"
                    placeholder="0-0-0-0"
                    @blur="$v.sms.$touch()"
                    :error-messages="smsErrors"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary"
                     @click="submitSms"
                     rounded
                     class="px-6 text-capitalize"
                     :loading="$store.state.btnLoading"
              >Далее</v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
  import {required, minLength} from 'vuelidate/lib/validators'
  import {mask} from 'vue-the-mask'
  export default {
    data () {
      return {
        step: 1,
        phone: '',
        sms:'',
        phoneMask: '+380-##-###-##-##',
        smsMask: '#-#-#-#',
      }
    },
    directives: {
      mask,
    },
    validations: {
      phone: {
        required,
        minLength: minLength(18)
      },
      sms: {
        required,
        minLength: minLength(7)
      },
    },
    computed: {
      ...mapGetters(['getStepState']),
      phoneNumber() {
        return Number(this.phone.replace(/[+()]/g, " ").split(' ').join(''))
      },
      smsCode() {
        return Number(this.sms.replace(/[-]/g, " ").split(' ').join(''))
      },
      phoneErrors () {
        const errors = []
        if (!this.$v.phone.$dirty) return errors
        !this.$v.phone.required && errors.push('Телефон обязательное поле')
        !this.$v.phone.minLength && errors.push('Введите телефон полностью')
        return errors
      },
      smsErrors () {
        const errors = []
        if (!this.$v.sms.$dirty) return errors
        !this.$v.sms.required && errors.push('Sms обязательное поле')
        !this.$v.sms.minLength && errors.push('Введите sms (4 цифры)')
        return errors
      },
    },
    methods: {
      ...mapActions(['checkMobile', 'checkOtp']),
      async submitPhone () {
        this.$v.phone.$touch()
        if (this.$v.phone.$invalid) {
          return
        }
        const response = await this.checkMobile(this.phoneNumber)
        this.sms = response.data.result.code_otp
        this.$store.commit('setStep', 2)
      },
      async submitSms () {
        this.$v.sms.$touch()
        if (this.$v.sms.$invalid) {
          return
        }
        const otpData = {
          code_otp: this.smsCode,
          phone_number: this.phoneNumber,
        }
        await this.checkOtp(otpData)
      }
    },
    mounted() {
      console.log('mounted in login')

      this.axios.get('/web/58').then((response)=>{
        console.log(response, 'response in crm-cook')
      }).catch((error)=>{
        console.log(error, 'error in fetchBalance')
      })

      /*this.axios.get('/check-mobile/380972193386').then((response)=>{
        console.log(response, 'response in check-mobile')
      }).catch((error)=>{
        console.log(error, 'error in check-mobile')
      })*/
    }
  }
</script>