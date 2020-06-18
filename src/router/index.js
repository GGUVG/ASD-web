import Vue from 'vue'
import Router from 'vue-router'
import Hello1 from '@/components/Hello1'
import StaffLogin from '@/components/StaffLogin'

Vue.use(Router)

export default new Router({
  routes: 
  [
   {
      path: '/Hello1',
      name: 'Hello1',
      component: Hello1
    },
    {
      path: '/StaffLogin',
      name: 'StaffLogin',
      component: StaffLogin
    },
    
  ]
})
