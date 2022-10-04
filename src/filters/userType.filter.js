export default value => {
  if (value !== null){
    switch (value) {
      case 'owner':
        return 'Орендодатель'
      case 'consumer':
        return 'Арендатор'
      case 'realtor':
        return 'Риелтор'
    }
  }
}