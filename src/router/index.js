import Vue from 'vue'
import Router from 'vue-router'
import Hello1 from '@/components/Hello1'

Vue.use(Router)

export default new Router({
  routes: [
   {
      path: '/Hello1',
      name: 'Hello1',
      component: Hello1
    },
    
  ]
})
