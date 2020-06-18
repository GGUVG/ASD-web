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
import {getAppointCookie} from '../utils/common_util'
import {loginRequest} from '../components/StaffLoginService'
import JSON from 'JSON'

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
        loginRequest(tmp).then(res=>{
          if (res.data!=null) 
          {
          self.$message.success('success')
          //console.log(res)
          /*
          最好别用前端设置cookie
          VueCookies.set('staffCookie',res.data.data)
          */
          /*
          let originalCookie=getAppointCookie('backStaffCookie')//原始cookie
          let transcodeCookie=decodeURIComponent(originalCookie)//转码后人能看得懂的字符串
          let staffMsg = JSON.parse(transcodeCookie)//转json对象，就能拿里面的各项属性值
          */
          }else
          { 
          self.$message.error('fail'); 
          console.log('用户不存在或密码错误',res)  
          console.log(res)
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
