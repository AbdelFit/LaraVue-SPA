import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import Home from '../pages/Home'
import Login from '../pages/Auth/Login'
import SignUp from '../pages/Auth/SignUp'

import IndexProfile from '../pages/Profile/Index'

import Customer from '../pages/Customers/Customer'
import IndexCustomer from '../pages/Customers/Index'
import ShowCustomer from '../pages/Customers/Show'
import CreateCustomer from '../pages/Customers/Create'
import EditCustomer from '../pages/Customers/Edit'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
			component: Home,
			name: 'Home',
			redirect: '/customers',
      meta: {
        requiesAuth: true,
      }
    },
    {
      path: '/login',
			component: Login,
			name: 'Login'
    },
    {
      path: '/signup',
			component: SignUp,
			name: 'SignUp'
		},
		{
      path: '/profile',
      component: IndexProfile,
      meta: {
        requiesAuth: true,
      }
    },
    {
      path: '/customers',
      component: Customer,
      meta: {
        requiesAuth: true,
      },
      children: [
        {
          path: '',
					component: IndexCustomer,
					name: 'IndexCustomer'
        },
        {
          path: 'create',
					component: CreateCustomer,
					name: 'CreateCustomer'
				},
        {
          path: ':id',
					component: ShowCustomer,
					name: 'ShowCustomer'
        },
        {
          path: ':id/edit',
					component: EditCustomer,
					name: 'EditCustomer'
				}
      ]
    }
  ],
})

router.beforeEach((to, from, next) => {
  const requiesAuth = to.matched.some(record => record.meta.requiesAuth)
	const currentUser = store.getters.currentUser
	
  if (requiesAuth && !currentUser) {
    next('/login')
  } else if (to.path == '/login' && currentUser) {
    next('/')
  } else {
    next()
  }
})

export default router
