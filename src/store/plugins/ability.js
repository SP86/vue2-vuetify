import ability from '../../config/ability'

export default (store) => {

  if (store.state.auth.authenticated) {
    let role = store.state.auth.adminData.root
    let rules = []
    if (role) {
      rules = [{"action": "read", "subject": "all"}]
    } else {
      rules = store.state.auth.adminData.roleAttribute
    }

    ability.update(rules) // take rules from your state structure*/
    console.log('update(rules)')

  }
  return store.subscribe((mutation) => {
    switch (mutation.type) {
      case 'setAdminRoleAttribute':
          let role = store.state.auth.adminData.root
          let rules = []
          if (role) {
            rules = [{"action": "read", "subject": "all"}]
          } else {
            rules = store.state.auth.adminData.roleAttribute
          }
          ability.update(rules)
        break
      /*case 'setAuthenticated':
        console.log(store.state.auth.authenticated)
        if(!store.state.auth.authenticated){
          let rules = []
          ability.update(rules)
        }
        break*/
    }
  })


  /*return store.subscribe((mutation) => {
   switch (mutation.type) {
   case 'login':
   console.log('updateAbilities store')
   ability.update(mutation.payload.rules)
   break
   case 'setSpecialists':
   console.log('updateAbilities setSpecialists')
   break
   case 'logout':
   ability.update([{ actions: 'read', subject: 'all' }]) // read only mode
   // or `ability.update([])` to remove all permissions
   break
   }
   })*/
}