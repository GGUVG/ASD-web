<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Hello1 from './components/Hello1'
import StaffLogin from './components/StaffLogin'
import Vue from 'Vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
export default {
  name: 'App',
  components:{
    Hello1,StaffLogin
  }
}
</script>