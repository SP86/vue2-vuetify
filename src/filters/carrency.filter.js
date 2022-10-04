export default value => {
  if (value !== null){
    switch (value) {
      case 'USD':
        return 'USD'
      case 'EUR':
        return 'EURO'
      case 'UAH':
        return 'UAH'
    }
  }
}