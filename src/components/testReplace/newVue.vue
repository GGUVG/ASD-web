<template >
    <Hello>
    <template slot="middleContent">
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
        <img src='../../assets/vueJs.png'/>
    </div>
    <div>
        <span>测试页面跳转</span>
    </div>
    </template>
    </Hello>
</template>
<script>
import Hello from '../Hello1'
export default {
    name:'newVue',
    components:{
        Hello
    },
    mounted () {
        this.testMethod1()
    },
    data () 
    {
        return{
            str1:'this is a new Vue replace test'
        }
    },
    methods:{
        testMethod1()
        {
            let self=this
            console.log(self.str1)
        }
    }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>