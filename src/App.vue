<template>
  <div id="app">
      <Hello1>
        
      </Hello1>
    
  </div>
</template>

<script>
import Hello1 from './components/Hello1'
import Vue from 'Vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
export default {
  name: 'App',
  components:{
    Hello1
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
