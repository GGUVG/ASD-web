<template>
  <a-drawer
    title='报备新房源'
	  width="80%"
    @close="()=>handleCancel()"
    destroyOnClose
	  :visible=visible>
  <div>
          <a-form-model layout='horizontal'
          :model="criteria"
          ref="ruleForm"
          :rules="rules">
          <div>
          <a-row>
            <a-col :md="6" >
              <a-form-model-item label="房源类型" :labelCol="{span: 5}" 
              :wrapperCol="{span: 5, offset: 1}" 
              prop="houseType" 
              has-feedback>
              <a-select v-model="criteria.houseType" >
                <a-select-option value="10">住宅</a-select-option>
                <a-select-option value="20">公寓</a-select-option>
                <a-select-option value="30">商铺</a-select-option>
                <a-select-option value="40">写字楼</a-select-option>
                </a-select> 
              </a-form-model-item>
            </a-col>
            <a-col :md="6" >
              <a-form-model-item has-feedback ref="estateId" label="小区ID" :labelCol="{span: 5}" :wrapperCol="{span: 5, offset: 1}" prop="estateId">
                <a-input-number v-model="criteria.estateId" 
                @focus="onFocusEstateId" 
                @change="onChangeEstateId"/>
              </a-form-model-item>
            </a-col>
            <a-col :md="6" >
              <a-form-model-item label="门牌号" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}" prop="houseName" has-feedback>
              <a-input v-model="criteria.houseName"/>
              </a-form-model-item>
            </a-col>
            <a-col :md="6" >
              <a-form-model-item label="建成时间" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}" prop="completeTime" has-feedback>
              <a-input v-model="criteria.completeTime"/>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :md="13" :sm="24">
              <a-form-model-item ref="location" :autoLink="false" label="位置" :labelCol="{span: 2}" :wrapperCol="{span: 14, offset: 1}" prop="houseLocationStreet" >
                <a-select 
                id="houseLocationProvince"
                style="width: 100px" 
                showSearch
                allowClear:true
                ptionFilterProp="children"
                @change="handleProvinceChange" 
                @search="handleProvinceSearch"
                :filterOption="filterOption"
                v-model="criteria.houseLocationProvince">
                  <a-select-option v-for="p in provinceData" :key="p" :value="p">
                  {{p}}
                  </a-select-option>
                </a-select>
                <a-select
                ref="houseLocationCity"
                id="houseLocationCity"
                style="width: 100px" 
                showSearch
                ptionFilterProp="children"
                @change="handleCityChange" 
                @search="handleCitySearch"
                @focus="handleCityFocus"
                :filterOption="filterOption"
                v-model="criteria.houseLocationCity">
                  <a-select-option v-for="c in cityData" :key="c" :value="c">
                  {{c}}
                  </a-select-option>
                </a-select>
                <a-select
                id="houseLocationDistrict" 
                style="width: 100px"
                showSearch
                ptionFilterProp="children"
                @change="handleDistrictChange" 
                @search="handleDistrictSearch"
                @focus="handleDistrictFocus"
                :filterOption="filterOption"
                v-model="criteria.houseLocationDistrict">
                  <a-select-option v-for="d in districtData" :key="d" :value="d">
                  {{d}}
                  </a-select-option>
                </a-select>
                <a-select
                id="houseLocationStreet" 
                style="width: 100px"
                showSearch
                ptionFilterProp="children"
                @change="handleStreetChange"
                @search="handleStreetSearch"
                @focus="handleStreetFocus"
                @blur="()=>{$refs.location.onFieldBlur()}"
                :filterOption="filterOption"
                v-model="criteria.houseLocationStreet">
                  <a-select-option v-for="s in streetData" :key="s" :value="s">
                  {{s}}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              </a-col>
              <a-col :md="5" :sm="24">
              <a-form-model-item label="价格/平" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}" prop="housePrice" has-feedback>
                <a-input-number v-model="criteria.housePrice"/>
              </a-form-model-item>
              </a-col>
              <a-col :md="5" :sm="24">
              <a-form-model-item label="面积/平" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}" prop="houseSquare" has-feedback>
                <a-input-number v-model="criteria.houseSquare"/>
              </a-form-model-item>
              </a-col>
          </a-row>
          <a-row>
            <a-col :md="4" :sm="24">
              <a-form-model-item label="客户ID" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}" prop="houseClientId" has-feedback>
              <a-input-number v-model="criteria.houseClientId"/>
              </a-form-model-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="委托书材料" :labelCol="{span: 6}" :wrapperCol="{span: 14, offset: 1}" has-feedback>
                <a-upload
                id="newFile1"
                name="newFile1"
                :multiple="false"
                :headers="headersUpload"
                @change="handleChange"
                :remove="removeUploadFile"
                :before-upload="beforeUpload">
                <a-button> <a-icon type="upload" /> Click to Upload </a-button>
                </a-upload>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="未定义" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
                <a-input/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="未定义" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
                <a-input/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :md="6">
              <!--<a-button type="primary" @click="handleUploadMaterial()">Start Upload</a-button>-->
              <a-button type="primary" @click="submitNewHouse('ruleForm')">提交</a-button>
              <a-button @click="reset()">重置</a-button>
            </a-col>
          </a-row>
          </div>
          </a-form-model>
          </div>
        <a-drawer
        title='小区ID'
	      width="30%"
        @close="()=>handleCancelSecond()"
        destroyOnClose
        :closable="true"
	      :visible="secondVisible">
        <a-select
        style="width: 300px"
        showSearch
        ptionFilterProp="children"
        @change="handleEstateIdChange"
        @search="handleEstateIdSearch"
        @focus="handleEstateIdFocus"
        :filterOption="filterOption"
        v-model="criteria.estateId">
          <a-select-option v-for="e in estateList" :key="e.estateId" :value="e.estateId">
            {{e.estateId + "-" + e.estateName + e.estateProvince + 
            e.estateCity + e.estateDistrict + e.estateStreet}}
          </a-select-option>
        </a-select>
        </a-drawer>
  </a-drawer>
</template>
<script>
import moment from 'moment'
import { FormModel } from 'ant-design-vue';
import VueCookies from 'vue-cookies'
import { copyReqObj, exportExcel,getAppointCookie } from '../../../../utils/common_util'
import axios from 'axios'
import {addHouseSource,findProvinceList,findCityList,findDistrictList,
findStreetList,findHouseType,uploadHouseSaleFile,delUploadHouseSaleFile,
findEstateByName } from './ReportHouseSaleSourceService'
export default {
    name: 'ReportHouseSaleSourceModal',
  data () 
  {
    return {
      visible: false,
      secondVisible:false,
      loading: false,
      provinceData:[],
      cityData:[],
      districtData:[],
      streetData:[],
      houseTypeList:[],
      estateList:[],
      criteria:
      {
        houseType: '',
        mandate:'',
      },
      headersUpload:{},
      delInfoName:'',
      uploadStatus:true,
      fileList:[],
      rules: {
        houseType: [{ required: true, message: 'houseType null', trigger: 'change' }],
        estateId: [{ required: true, message: 'estateId null', trigger: 'change' }],
        houseName: [{ required: true, message: 'houseName null', trigger: 'change' }],
        completeTime: [{ required: true, message: 'completeTime null', trigger: 'change' }],
        houseLocationStreet: [{ required: true, message: 'Location null', trigger: 'blur' }],
        housePrice: [{ required: true, message: 'housePrice null', trigger: 'change' }],
        houseSquare: [{ required: true, message: 'houseSquare null', trigger: 'change' }],
        houseClientId: [{ required: true, message: 'houseClientId null', trigger: 'change' }],
        
      },
    }
  },
  mounted () 
  {
    this.getProvince()
    this.getHouseType()
  },
  watch:
  {
  },
  methods: 
  {
    change123(e){
      console.log('aaaaa',e)
    },
    showModal()
    {
      this.visible = true
    },
    reset()
    {
      this.criteria = {}
    },
    handleCancel()
    {
      this.reset()
      this.visible=false
    },
    submitNewHouse(ruleForm)
    {
      let self=this
      let originalCookie=getAppointCookie('backStaffCookie')
      if(originalCookie==null)
      {
        self.$message.error('未登录!')
        return
      }
      let transcodeCookie=decodeURIComponent(originalCookie)
      let staffMsg = JSON.parse(transcodeCookie)
      if(staffMsg.staffId==null || staffMsg.staffId=='')
      {
        self.$message.error('当前登录状态空!')
        return
      }
      if(self.criteria.houseType==null || self.criteria.houseType=='')
      {
        self.$message.warning('房屋类型未填!')
        return
      }
      if(self.criteria.houseType==null || self.criteria.houseType=='')
      {
        self.$message.warning('房屋类型未填!')
        self.submitBtnCheck=false
        return
      }
      if(self.criteria.estateId==null || self.criteria.estateId=='')
      {
        self.$message.warning('小区ID未填!')
        self.submitBtnCheck=false
        return
      }
      if(self.criteria.houseName==null || self.criteria.houseName=='')
      {
        self.$message.warning('门牌号未填!')
        self.submitBtnCheck=false
        return
      }
      if(self.criteria.completeTime==null || self.criteria.completeTime=='')
      {
        self.$message.warning('建成时间未填!')
        self.submitBtnCheck=false
        return
      }
      if(self.criteria.completeTime.length<4)
      {
        self.$message.warning('校验建成时间!')
        self.submitBtnCheck=false
        return
      }
      if(self.criteria.houseLocationProvince==null || self.criteria.houseLocationProvince=='')
      {
        self.$message.warning('省位置未填!')
        self.submitBtnCheck=false
        return
      }
      if(self.criteria.housePrice==null || self.criteria.housePrice=='')
      {
        self.$message.warning('价格未填!')
        self.submitBtnCheck=false
        return
      }
      if(self.criteria.houseSquare==null || self.criteria.houseSquare=='')
      {
        self.$message.warning('面积未填!')
        self.submitBtnCheck=false
        return
      }
      if(self.criteria.houseClientId==null || self.criteria.houseClientId=='')
      {
        self.$message.warning('客户(出售)未填!')
        self.submitBtnCheck=false
        return
      }
      let mandateSuffix=self.fileList[0].name
      console.log('mandateSuffix...',mandateSuffix)
      self.$refs[ruleForm].validate(vaild =>{
        if(vaild)
        {
          alert('提交校验通过');
          if(self.fileList.length==0)
          {
            alert('未上传材料')
            return
          }
          addHouseSource(self.criteria)
          .then(res => {
            this.loading = false
            if (res.status==0) {
              console.log(res)
              this.handleUploadMaterial()
              this.$message.success('提交成功')
              this.handleCancel()
            } else {
              this.$message.error('提交失败')
            }
          })
          .catch(err => {
          this.loading = false
          this.$message.error('提交错误')
          console.log(`err is ${err}`)
          })
        }else {
       console.log('error submit!!');
       return false;
       }
      })
     
    },
    handleProvinceChange(value) 
    {
      this.criteria.houseLocationProvince=value
    },
    handleProvinceSearch()
    {
      this.getProvince()
    },
    handleCityChange(value) 
    {
      this.criteria.houseLocationCity=value
    },
    handleCitySearch()
    {
      this.getCity()
    },
    handleCityFocus()
    {
      this.getCity()
    },
    handleDistrictChange(value) 
    {
      this.criteria.houseLocationDistrict=value
    },
    handleDistrictSearch()
    {
      this.getDistrict()
    },
    handleDistrictFocus()
    {
      this.getDistrict()
    },
    handleStreetChange(value) 
    {
      this.criteria.houseLocationStreet=value
    },
    handleStreetSearch()
    {
      this.getStreet()
    },
    handleStreetFocus()
    {
      this.getStreet()
    },
    onChangeEstateId(value)
    {
      this.criteria.estateId=value
      this.$refs.estateId.onFieldChange();
    },
    handleEstateIdChange(value)
    {
      this.onChangeEstateId(value)
    },
    handleEstateIdSearch(value)
    {
      let self=this
      let estateReq={
        estateName:value
      }
      self.getEstateList(estateReq)
    },
    handleEstateIdFocus()
    {

    },
    handleHouseTypeChange(value) 
    {
      this.criteria.houseType=value
    },
    handleHouseTypeSearch()
    {
      this.getHouseType()
    },
    onFocusEstateId()
    {
      this.secondVisible=true
    },
    getProvince()
    {
      let self=this
     findProvinceList().then(res=>{
          if (res) 
          {
          self.provinceData=res.data
          }else
          { 
          self.provinceData=[]
          self.$message.error('获取省级菜单失败'); 
          console.log('province fail...',res)  
          }
          }).catch(err => {console.log(`err is ${err}`)})

    },
    getCity()
    {
      let self=this
      let province1=self.criteria.houseLocationProvince
      findCityList (province1).then(res=>{
          if (res.status==0) 
          {
          self.cityData=res.data
          }else
          { 
          self.cityData=[]
          self.$message.error('获取市菜单失败'); 
          console.log('city fail...',res)  
          }
          }).catch(err => {console.log(`err is ${err}`)})

    },
    getDistrict()
    {
      let self=this
      let city1=self.criteria.houseLocationCity
      findDistrictList(city1).then(res=>{
          if (res.status==0) 
          {
          self.districtData=res.data
          }else
          { 
          self.districtData=[]
          self.$message.error('获取区菜单失败'); 
          console.log('district fail...',res)  
          }
          }).catch(err => {console.log(`err is ${err}`)})

    },
    getStreet()
    {
      let self=this
      let district1=self.criteria.houseLocationDistrict
      findStreetList(district1).then(res=>{
          if (res.status==0) 
          {
          self.streetData=res.data
          }else
          { 
          self.streetData=[]
          self.$message.error('获取街菜单失败'); 
          console.log('street fail...',res)  
          }
          }).catch(err => {console.log(`err is ${err}`)})

    },
    getHouseType()
    {
      let self=this
      findHouseType().then(res=>{
          if (res.status==0) 
          {
          self.houseTypeList=res.data
          }else
          { 
          self.houseTypeList=[]
          self.$message.error('获取房屋类型列表失败'); 
          console.log('get houseType fail...',res)  
          }
          }).catch(err => {console.log(`err is ${err}`)})

    },
    getEstateList(req)
    {
      let self=this
      findEstateByName(req).then(res =>{
        if (res.status==0) 
          {
          self.estateList=res.data
          }else
          { 
          self.estateList=[]
          self.$message.error('获取小区列表失败'); 
          console.log('get Estate List fail...',res)  
          }
      }).catch(err => {console.log(`err is ${err}`)})
    },
    filterOption(input, option) 
    {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    handleChange(info) { // 上传文件
        if (info.file.status !== 'uploading') {
        }
        if (info.file.status === 'done') {
          this.$message.success(`${info.file.name} 上传成功`);
        } else if (info.file.status === 'error') {
          this.$message.error(`${info.file.name} 上传失败.`);
        }
    },
    removeUploadFile(file)
    {
      console.log("remove",file)
      //let index = this.fileList.indexOf(file)//示例写法,会出现index为-1的异常，
      let index = this.fileList.indexOf(file.originFileObj) //正确写法
      console.log("remove index",index)
      let newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
      console.log('newFileList...',this.fileList)

    },
    beforeUpload(file) 
    {
      console.log("beforeUpload",file)
      let newFileNameSuffix=this.matchType(file.name)
      let needIdTxt=JSON.parse(decodeURIComponent(getAppointCookie('backStaffCookie'))).staffId
      let newFileName=JSON.parse(decodeURIComponent(getAppointCookie('backStaffCookie'))).staffUsername
      let newFileNameTxt=needIdTxt+newFileName+"."+newFileNameSuffix
      this.fileList = [...this.fileList, file];
      this.criteria.mandate = newFileNameTxt
      return false;
    },
    handleUploadMaterial()
    {
      let self=this
      let fileList = self.fileList;
      let formData = new FormData();

      for(let file of fileList){
        formData.append('newFile1', file);
        formData.append('houseEstateId', self.criteria.estateId);
        formData.append('houseName', self.criteria.houseName);
        formData.append('materialTypeTxt', '委托书材料');
        formData.append('houseLocationProvince', self.criteria.houseLocationProvince);
        formData.append('houseLocationCity', self.criteria.houseLocationCity);
        formData.append('houseLocationDistrict', self.criteria.houseLocationDistrict);
        formData.append('houseLocationStreet', self.criteria.houseLocationStreet);
        formData.append('staffId',JSON.parse(decodeURIComponent(getAppointCookie('backStaffCookie'))).staffId);
        formData.append('staffUserName',JSON.parse(decodeURIComponent(getAppointCookie('backStaffCookie'))).staffUsername);
      }
      // fileList.forEach(file => {
      //   formData.append('newFile1', file);
      //   formData.append('houseEstateId', self.criteria.estateId);
      //   formData.append('houseName', self.criteria.houseName);
      //   formData.append('materialTypeTxt', '委托书材料');
      //   formData.append('houseLocationProvince', self.criteria.houseLocationProvince);
      //   formData.append('houseLocationCity', self.criteria.houseLocationCity);
      //   formData.append('houseLocationDistrict', self.criteria.houseLocationDistrict);
      //   formData.append('houseLocationStreet', self.criteria.houseLocationStreet);
      //   formData.append('staffId',JSON.parse(decodeURIComponent(getAppointCookie('backStaffCookie'))).staffId);
      //   formData.append('staffUserName',JSON.parse(decodeURIComponent(getAppointCookie('backStaffCookie'))).staffUsername);
      // });
      uploadHouseSaleFile(formData).then( (res) =>{
        if (res=='success')
        {
          self.$message.success('上传成功');
        }else
        {
          self.$message.error('上传失败'); 
          console.log('uploadFile fail...',res)  
        }
          self.fileList = [];
      }).catch(err => {console.log(`err is ${err}`)})
    },
    handleCancelSecond()
    {
      this.secondVisible=false
    },
    matchType(info) 
    {        
      // 后缀获取
      let a = info.split('').reverse().join('');
      let b = a.substring(0,a.search(/\./)).split('').reverse().join('');
      return b
    }

  },

}
</script>
