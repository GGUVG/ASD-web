import Vue from 'vue'
import Router from 'vue-router'
import Hello1 from '@/components/Hello1'
import StaffLogin from '@/components/StaffLogin'
import newVue from '../components/testReplace/newVue'
Vue.use(Router)

export default new Router({
  routes: 
  [
   {
      path: '/',
      name: 'Hello1',
      component: Hello1
    },
    {
      path: '/StaffLogin',
      name: 'StaffLogin',
      component: StaffLogin
    },
    {
      path: '/newVue',
      name: 'newVue',
      component: newVue
    },
  ]
})
