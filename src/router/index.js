import Vue from 'vue'
import Router from 'vue-router'
import Hello1 from '@/components/Hello1'
import StaffLogin from '@/components/StaffLogin'
import newVue from '../components/testReplace/newVue'
import ArticleList from '../components/welfare/ArticleList'
import ArticleDetail from '../components/welfare/ArticleDetail'
import ImgList from '../components/welfare/ImgList'
import ImgDetail from '../components/welfare/ImgDetail'
Vue.use(Router)


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

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
    {
      path: '/ArticleList',
      name: 'ArticleList',
      component: ArticleList
    },
    {
      path: '/ArticleDetail',
      name: 'ArticleDetail',
      component: ArticleDetail
    },
    {
      path: '/ImgList',
      name: 'ImgList',
      component: ImgList
    },
    {
      path: '/ImgDetail',
      name: 'ImgDetail',
      component: ImgDetail
    },
  ]
})
