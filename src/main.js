// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue';
import App from './App';
import router from './router';
import $ from 'jquery';
import axios from 'axios';
import ant from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.use(ant)
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.withCredentials = true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
     App 
    },
  template: '<App/>',
});
