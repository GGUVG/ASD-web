<template>
  <a-drawer
    title='报备新房源'
	  width="80%"
    @close="()=>handleCancel()"
    :destroyOnClose="true"
	  :visible=visible
  >
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
              <a-form-model-item has-feedback label="小区ID" :labelCol="{span: 5}" :wrapperCol="{span: 5, offset: 1}" prop="estateId">
                <a-input-number v-model="criteria.estateId"/>
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
              <a-form-model-item ref="location" :autoLink="false" label="位置" :labelCol="{span: 1}" :wrapperCol="{span: 14, offset: 1}" prop="houseLocationStreet" has-feedback>
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
              <a-form-item label="委托书材料" :labelCol="{span: 6}" :wrapperCol="{span: 14, offset: 1}" prop="houseClientId" has-feedback>
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
              <a-button type="primary" @click="handleUpload()">Start Upload</a-button>
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
        :destroyOnClose="true"
	      :visible=visible>
        <a-select
        @change="handleEstateIdChange"
        @search="handleEstateIdSearch"
        @focus="handleEstateIdFocus"
        :filterOption="filterOption">
          <a-select-option>1</a-select-option>
          <a-select-option>2</a-select-option>
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
findStreetList,findHouseType,uploadHouseSaleFile,delUploadHouseSaleFile } from './ReportHouseSourceService'
export default {
    name: 'ReportHouseSourceModal',
  data () 
  {
    return {
      visible: false,
      loading: false,
      provinceData:[],
      cityData:[],
      districtData:[],
      streetData:[],
      houseTypeList:[],
      criteria:
      {
        houseType: '',
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
      this.visible=false
    },
    submitNewHouse(ruleForm)
    {
      let self=this
      self.$refs[ruleForm].validate(vaild =>{
        if(vaild)
        {
          alert('submit!');
          addHouseSource(self.criteria)
          .then(res => {
          this.loading = false
          if (res.status==0) {
            console.log(res)
            this.$message.success('提交成功')
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
    handleEstateIdChange()
    {
      console.log('handleEstateIdChange')
    },
    handleEstateIdSearch()
    {
      console.log('handleEstateIdSearch')
    },
    handleEstateIdFocus()
    {
      console.log('handleEstateIdFocus')
    },
    handleHouseTypeChange(value) 
    {
      this.criteria.houseType=value
    },
    handleHouseTypeSearch()
    {
      this.getHouseType()
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
    removeUploadFile(info)
    {
      console.log('remove info...',info)
      let infoName=info.name
      let fileMsg={
        fileName:infoName
      }
      delUploadHouseSaleFile(fileMsg).then(res =>{
         if (res.status==0) 
          {
          self.$message.success('删除成功');
          }else
          {
          self.$message.error('删除失败'); 
          console.log('del uploadFile fail...',res)  
          }
          }).catch(err => {console.log(`err is ${err}`)})
    },
    beforeUpload(file) 
    {
      this.fileList = [...this.fileList, file];
      return false;
    },
    handleUpload()
    {
      let self=this
      let fileList = self.fileList;
      let formData = new FormData();
      fileList.forEach(file => {
        formData.append('newFile1', file);
        formData.append('houseLocationProvince', self.criteria.houseLocationProvince);
        formData.append('houseLocationCity', self.criteria.houseLocationCity);
        formData.append('houseLocationDistrict', self.criteria.houseLocationDistrict);
        formData.append('houseLocationStreet', self.criteria.houseLocationStreet);
        formData.append('staffId',JSON.parse(decodeURIComponent(getAppointCookie('backStaffCookie'))).staffId);
        formData.append('staffUserName',JSON.parse(decodeURIComponent(getAppointCookie('backStaffCookie'))).staffUsername);
      });
      uploadHouseSaleFile(formData).then( (res) =>{
        if (res=='success') 
          {
          self.fileList = [];
          self.$message.success('上传成功');
          }else
          {
          self.$message.error('上传失败'); 
          console.log('uploadFile fail...',res)  
          }
      }).catch(err => {console.log(`err is ${err}`)})
    },

  },

}
</script>
