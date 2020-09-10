<template>
  <a-layout id="components-layout-demo-custom-trigger"  >
    
    <a-layout-sider v-model="collapsed" collapsible>
      <div class="logo" />
      <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
        <a-menu-item key="toMain">
          <a-icon type="home" />
          <span>首页</span>
        </a-menu-item>
        <a-sub-menu key="subIntegratedBusiness">
          <span slot="title"><a-icon type="menu-unfold" /><span>综合业务</span></span>
          <a-sub-menu key="housingHandle"><span slot="title"><a-icon type="bank"/><span>房源管理</span></span>
              <a-menu-item key="housingSaleHandle" @click="openHousingSaleModal">买卖房源</a-menu-item>
              <CheckHouseMsgSaleModal ref="CheckHouseMsgSaleModal"></CheckHouseMsgSaleModal>
              <a-menu-item key="housingRentHandle" @click="openHousingRentModal">租赁房源</a-menu-item>
              <CheckHouseMsgRentModal ref="CheckHouseMsgRentModal"></CheckHouseMsgRentModal>
              <a-menu-item key="housingSaleReport" @click="openReportHouseSaleSourceModal()">新买卖房源报备</a-menu-item>
              <ReportHouseSaleSourceModal ref="ReportHouseSaleSourceModal"></ReportHouseSaleSourceModal>
              <a-menu-item key="housingRentReport" @click="openReportHouseRentSourceModal()">新租赁房源报备</a-menu-item>
              <ReportHouseRentSourceModal ref="ReportHouseRentSourceModal"></ReportHouseRentSourceModal>
          </a-sub-menu>
          <a-sub-menu key="clientHanle"><span slot="title"><a-icon type="contacts"/><span>客户管理</span></span>
              <a-menu-item key="clientDigital" @click="openClientMsgModal()">电子客簿</a-menu-item>
              <CLientMsgModal ref="CLientMsgModal"></CLientMsgModal>
              <a-menu-item key="clientExploit">淘客</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="keyHandle"><a-icon type="keyHandle"/><span slot="title"><a-icon type="key"/><span>钥匙管理</span></span>
              <a-menu-item key="keyRegister">钥匙登记</a-menu-item>
              <a-menu-item key="keyBorrow">钥匙外出</a-menu-item>
              <a-menu-item key="keyReturn">钥匙归还</a-menu-item>
              <a-menu-item key="keyBorrowFromBranch">分行借用</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="transactionHandle"><span slot="title"><a-icon type="wallet"/><span>交易管理</span></span>
              <a-menu-item key="transactionSaleReport">买卖单交易完成报备</a-menu-item>
              <a-menu-item key="transactionRentReport">租赁单交易完成报备</a-menu-item>
              <a-menu-item key="transactionSaleDone">买卖单历史交易完成信息</a-menu-item>
              <a-menu-item key="transactionRentDone">租赁单历史交易完成信息</a-menu-item>
          </a-sub-menu>
          <a-menu-item key="webChat">
            <a-icon type="wechat"/>
            <span>会话室</span>
          </a-menu-item>
          <a-menu-item key="schedule">
            <a-icon type="schedule"/>
            <span>日程安排</span> 
          </a-menu-item>
          <a-menu-item key="estateGallery">
            <a-icon type="picture"/>
            <span>楼盘图库</span> 
          </a-menu-item>
          <a-sub-menu key="propertyManagement"><span slot="title"><a-icon type="insurance"/><span>物业管理</span></span>
              <a-menu-item key="propertyRegister">物业登记</a-menu-item>
              <a-menu-item key="propertySearch">物业查询</a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
        <a-sub-menu key="payrollAttendacne">
          <span slot="title"><a-icon type="dollar"/><span>工资考勤</span></span>
          <a-menu-item key="attendanceRecord">
            <a-icon type="tags"/><span>出勤记录</span>
          </a-menu-item>
          <a-menu-item key="attendanceSummary">
            <a-icon type="table"/><span>出勤汇总</span>
          </a-menu-item>
          <a-menu-item key="achievements">
            <a-icon type="money-collect"/><span>绩效/佣金</span>
          </a-menu-item>
          <a-menu-item key="salaryMonth">
            <a-icon type="gold"/><span>工资查询</span>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="Management">
          <span slot="title"><a-icon type="user"/><span>管理级</span></span>
          <a-menu-item key="myBranches">
            <a-icon type="team"/><span>我的分行</span>
          </a-menu-item>
          <a-menu-item key="approvalLeave">
            <a-icon type="file-done"/><span>审批请假</span>
          </a-menu-item>
          <a-menu-item key="approvalErrands">
            <a-icon type="file-done"/><span>审批外勤</span>
          </a-menu-item>
          <a-menu-item key="approvalSaleHousing">
            <a-icon type="file-done"/><span>审批报备新房源</span>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="developmentHanle">
          <span slot="title"><a-icon type="tool" /><span>开发测试</span></span>
          <a-menu-item key="development1">
            <span @click="developmentTest1"><a-icon type="branches" />前端vue启动测试</span>
          </a-menu-item>
          <a-menu-item key="development2">
            <span @click="developmentTest2"><a-icon type="branches" />后端连接测试</span>
          </a-menu-item>
          <a-menu-item key="development3">
            <span @click="developmentTest3"><a-icon type="branches" />数据库连接测试</span>
          </a-menu-item>
          <a-menu-item key="temporaryLogin">
            <span @click="staffLogin"><a-icon type="branches" />临时登录</span>
            <StaffLogin ref="StaffLogin"></StaffLogin>
          </a-menu-item>
          <a-menu-item key="checkCookie">
            <span @click="checkCookie"><a-icon type="branches" />测试cookie</span>
          </a-menu-item>
          <a-menu-item key="getUserMsg">
            <span @click="getUserMsg"><a-icon type="branches" />获取当前登录者信息</span>
          </a-menu-item>
          <a-menu-item key="linkTest">
            <router-link to="/newVue">测试页面跳转</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="welfare">
          <span slot="title"><a-icon type="car" /><span>福利</span></span>
          <a-menu-item key="gorgeousPhotography">
            <a-icon type="camera"/><span @click="onOpenGorgeousPhotography">写真</span>
          </a-menu-item>
          <a-menu-item key="gorgeousMoviesXXX">
            <a-icon type="play-square"/><span @click="onOpenGorgeousMoviesXXX">片</span>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon 
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <slot name="middleContent">
      </slot>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
  
</template>
<script>
import axios from 'axios';
axios.defaults.withCredentials = true;// 允许跨域携带cookie
import CheckHouseMsgSaleModal from './subIntegratedBusiness/housingHandle/houseSale/CheckHouesMsgSaleModal';
import CheckHouseMsgRentModal from './subIntegratedBusiness/housingHandle/houseRent/CheckHouesMsgRentModal';
import ReportHouseSaleSourceModal from './subIntegratedBusiness/housingHandle/reportHouseSource/ReportHouseSaleSourceModal'
import ReportHouseRentSourceModal from './subIntegratedBusiness/housingHandle/reportHouseSource/ReportHouseRentSourceModal'
import CLientMsgModal from './subIntegratedBusiness/clientHanle/ClientMsgModal'
import StaffLogin from './StaffLogin.vue'
import Cookies from 'js-cookie'
import VueCookies from 'vue-cookies'
import { getCookie } from '../utils/utils'


export default {
  name: 'Hello1',
  components: {
    StaffLogin,CheckHouseMsgSaleModal,CheckHouseMsgRentModal,ReportHouseSaleSourceModal,
    ReportHouseRentSourceModal,CLientMsgModal
  },
  data() {
    return {
      collapsed: false,
      
    };
  },
   mounted () 
  {

  },
  methods:
  {
    developmentTest1()
    {
      console.log(`Vue success`)
    },
    developmentTest2()
    {
      let self = this
      axios({
          url: "http://localhost:8091/v1/testApi/test1",
          method: "POST",
          data:'',
          headers:
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
          }
          }).then(res=>{
          if (res) 
          {
          self.$message.success('success')
          console.log(res)
          }else
          {
          self.$message.error('fail');   
          }
                       }).catch(err => {console.log(`err is ${err}`)})
    },
    developmentTest3()
    {
      let self = this
      axios({
          url: "http://localhost:8091/v1/testApi/testConnectMysql",
          method: "POST",
          data:'',
          headers:
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
          }
          }).then(res=>{
          if (res) 
          {
          self.$message.success('success')
          console.log(res)
          }else
          {
          self.$message.error('fail');   
          }
                       }).catch(err => {console.log(`err is ${err}`)})
    },
    getUserMsg()
    {
      let self = this
      axios({
          url: "http://localhost:9091/v1/sys/user/getCurrentUser",
          method: "POST",
          data:'',
          headers:
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
          }
          }).then(res=>{
            // console.log('获取登录信息res',res)
            if(res.data.status==0)
            {
              let ret=res.data.data
              self.$message.success('欢迎:'+ret.staffUsername)
              console.log('success login Msg:',ret)
            }else{
              self.$message.error('获取当前登陆者信息失败:',res.data.message)
            }
          })
    },
    linkTest(){

    },
    staffLogin()
    {
      this.$refs.StaffLogin.showModal()
    },
    openHousingSaleModal()
    {
      this.$refs.CheckHouseMsgSaleModal.showModal()
    },
    openHousingRentModal()
    {
      this.$refs.CheckHouseMsgRentModal.showModal()
    },
    openReportHouseSaleSourceModal()
    {
      this.$refs.ReportHouseSaleSourceModal.showModal()
    },
    openReportHouseRentSourceModal()
    {
      this.$refs.ReportHouseRentSourceModal.showModal()
    },
    openClientMsgModal()
    {
      this.$refs.CLientMsgModal.showModal()
    },
    checkCookie()
    {
      console.log(VueCookies.keys())
    },
    onOpenGorgeousPhotography()
    {
      this.$message.warning('还没开车呢')
    },
    onOpenGorgeousMoviesXXX()
    {
      this.$message.warning('还没开车呢')
    }
  },

};
</script>

<style>

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  position: relative;
  left: -48%;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

</style>
