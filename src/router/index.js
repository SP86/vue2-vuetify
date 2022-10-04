import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '@/store'
import ability  from '../config/ability'

Vue.use(VueRouter)

const routes = [
  {
    path: "*",
    component: () => import('../views/PageNotFound.vue'),
    meta: {layout: 'empty', auth: true, resource: 'Accessed', sidebar: false},
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {layout: 'empty', resource: 'Accessed', sidebar: false},
  },
  {
    path: '/',
    name: 'Главная',
    component: () => import('../views/Home.vue'),
    meta: {layout: 'main', auth: true, resource: 'Accessed', sidebar: false},
  },
  {
    path: '/realtors',
    name: 'Риелторы',
    component: () => import('../views/Realtors.vue'),
    meta: {layout: 'main', auth: true, resource: '8', sidebar: false},
    children: [
      {
        name: 'Риелтор',
        path: '/realtors/realtor-:realtorId',
        component: () => import('../views/Realtors.vue'),
        meta: {layout: 'main', auth: true, resource: '8', sidebar: false},
        props: true,
      },
    ]
  },
  {
    path: '/roles',
    name: 'Роли',
    component: () => import('../views/Roles.vue'),
    meta: {layout: 'main', resource: '5', auth: true, sidebar: 'RolesList'},
    children: [
      {
        name: 'Создание роли',
        path: '/roles/create',
        component: () => import('../views/Roles.vue'),
        meta: {layout: 'main', auth: true, resource: '5', sidebar: 'RolesList'},
      },
      {
        name: 'Редактирование роли',
        path: '/roles/role-:roleId',
        component: () => import('../views/Roles.vue'),
        meta: {layout: 'main', auth: true, resource: '5', sidebar: 'RolesList'},
        props: true,
      },
    ]
  },
  {
    path: '/balance',
    name: 'Баланс',
    component: () => import('../views/Balance.vue'),
    meta: {layout: 'main', auth: true, resource: '6', sidebar: false},
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const authenticatedState = Store.getters.getAuthenticatedState
  const accessToken = Store.getters.getUserAccessToken
  const requireAuth = to.matched.some(record => record.meta.auth)
  const canNavigate = to.matched.some(route => {
    if(route.path !== '/login'){
      Store.dispatch('getImportantNotificationsCount')
    }

    if (route.meta.resource === 'Accessed') {
      return true
    } else {
      return ability.can('read', route.meta.resource)
      //return true
    }
  })

  if (requireAuth && !authenticatedState && accessToken === null) {
    next('/login')
  } else if (!canNavigate) {
    next('/')
  } else {
    next()
  }
})

export default router
