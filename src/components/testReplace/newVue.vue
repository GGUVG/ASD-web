<template >
    <Hello>
    <template slot="middleContent">
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
        <img src='../../assets/main.jpg'/>
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
            str1:'this is a new Vue'
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