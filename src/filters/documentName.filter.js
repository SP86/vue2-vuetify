export default value => {
  if (value !== null){
    switch (value) {
      case 'identification_code':
        return 'Идентификационный номер'
      case 'first_page_password':
        return 'Первая страница паспорта'
      case 'second_page_password':
        return 'Вторая страница паспорта'
      case 'registration_address':
        return 'Прописка'
    }
  }
}