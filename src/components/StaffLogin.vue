<template>
  <a-modal
    title='临时登录测试'
	  width="40%"
    @ok="handleOk()"
    @cancel="handleCancel()"
    :destroyOnClose="true"
	  :visible=visible
  >
  <a-form layout='vertical' ref="myForm" :autoFormCreate="(form)=>{this.form = form}">
      <a-form-item label="登录ID" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
                <a-input-number placeholder="请输入" v-model="staffID"/>
      </a-form-item>
      <a-form-item label="登录密码" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
                <a-input placeholder="请输入" v-model="staffPassword"/>
      </a-form-item>
  </a-form>
  </a-modal>
</template>
<script>
import moment from 'moment'
import axios from 'axios'
import Cookies from 'js-cookie'
import VueCookies from 'vue-cookies'
import {getAppointCookie} from '../server/utils'
import JSON from 'JSON'

//https://www.jianshu.com/p/8deae75624eb
export default {
    name: 'StaffLogin',
  data () 
  {
    return {
      visible: false,
      staffID:'',
      staffPassword:'',
    }
  },
  mounted () 
  {
    
  },
  methods: 
  {
      showModal()
      {
        this.visible = true
      },
      handleOk()
      {
        this.visible=false
        let self = this
        let time=100
        let tmp = {
          staffId:self.staffID,
          staffPassword:self.staffPassword
        }
        axios({
          url: "http://localhost:8080/v1/staff/staffLogin",
          method: "POST",
          data:tmp,
          headers:
          {
            'Accept': 'application/json',
          }
          }).then(res=>{
          if (res.data.data!=null) 
          {
          self.$message.success('success')
          console.log(res)
          /*
          最好别用前端设置cookie
          VueCookies.set('staffCookie',res.data.data)
          */
          let originalCookie=getAppointCookie('backStaffCookie')//原始cookie
          let transcodeCookie=decodeURIComponent(originalCookie)//转码后人能看得懂的字符串
          let staffMsg = JSON.parse(transcodeCookie)//转json对象，就能拿里面的各项属性值
          let staffIdMsg=staffMsg.staffUsername//我这里拿个ID，爱拿什么拿什么你自己改
          }else
          { 
          self.$message.error('fail'); 
          console.log('用户不存在或密码错误',res)  
          }
                       }).catch(err => {console.log(`err is ${err}`)})
      },
      handleCancel()
      {
        this.visible=false
      },
      

  },

}
</script>
