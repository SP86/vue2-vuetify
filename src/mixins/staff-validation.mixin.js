export default {
  computed: {
    selectErrors () {
      const errors = []
      if (!this.$v.role.$dirty) return errors
      !this.$v.role.required && errors.push('Выберите роль')
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Имя обязательно')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('введите правильный e-mail')
      !this.$v.email.required && errors.push('E-mail обязательный')
      return errors
    },
    phoneErrors () {
      const errors = []
      if (!this.$v.phone.$dirty) return errors
      !this.$v.phone.required && errors.push('Телефон обязательное поле')
      !this.$v.phone.minLength && errors.push('Введите телефон полностью')
      return errors
    },
  },
}