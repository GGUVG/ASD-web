<template>
  <a-drawer
    title='报备新房源'
	  width="80%"
    @close="()=>handleCancel()"
    :destroyOnClose="true"
	  :visible=visible
  >
  <div>
          <a-form layout='horizontal'>
          <div>
          <a-row>
            <a-col :md="6" >
              <a-form-item label="房源类型" :labelCol="{span: 5}" :wrapperCol="{span: 5, offset: 1}">
              <a-select v-model="criteria.houseType">
                <a-select-option value="10">住宅</a-select-option>
                <a-select-option value="20">公寓</a-select-option>
                <a-select-option value="30">商铺</a-select-option>
                <a-select-option value="40">写字楼</a-select-option>
                </a-select> 
              </a-form-item>
            </a-col>
            <a-col :md="6" >
              <a-form-item label="小区ID" :labelCol="{span: 5}" :wrapperCol="{span: 5, offset: 1}">
              <a-input-number v-model="criteria.estateId"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" >
              <a-form-item label="门牌号" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
              <a-input v-model="criteria.houseName"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" >
              <a-form-item label="建成时间" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
              <a-input v-model="criteria.completeTime"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :md="13" :sm="24">
              <a-form-item label="位置" :labelCol="{span: 1}" :wrapperCol="{span: 14, offset: 1}">
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
                :filterOption="filterOption"
                v-model="criteria.houseLocationStreet">
                  <a-select-option v-for="s in streetData" :key="s" :value="s">
                  {{s}}
                  </a-select-option>
                </a-select>
              </a-form-item>
              </a-col>
              <a-col :md="5" :sm="24">
              <a-form-item label="价格/平" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
                <a-input-number v-model="criteria.housePrice"/>
              </a-form-item>
              </a-col>
              <a-col :md="5" :sm="24">
              <a-form-item label="面积/平" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
                <a-input-number v-model="criteria.houseSquare"/>
              </a-form-item>
              </a-col>
          </a-row>
          <a-row>
            <a-col :md="4" :sm="24">
              <a-form-item label="客户ID" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
              <a-input-number v-model="criteria.houseClientId"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="委托书材料1" :labelCol="{span: 6}" :wrapperCol="{span: 14, offset: 1}">
                <a-upload
                name="file"
                :multiple="true"
                :before-upload="beforeUpload"
                :headers="headers"
                @change="uploadHandle"
                >
                <a-button> <a-icon type="upload" /> Click to Upload </a-button>
                </a-upload>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="材料2" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
                <a-input/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="材料3" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
                <a-input/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :md="6" :sm="24">
              <a-form-item label="材料4" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
                <a-input/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="材料5" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
                <a-input/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="户型图" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
                <a-input/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="室内图" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
                <a-input/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :md="6">
              <a-button type="primary" @click="submitNewHouse()">提交</a-button>
              <a-button @click="reset()">重置</a-button>
            </a-col>
          </a-row>
          </div>
          </a-form>
          </div>
  </a-drawer>
</template>
<script>
import moment from 'moment'
import VueCookies from 'vue-cookies'
import { copyReqObj, exportExcel,getAppointCookie } from '../../../../utils/common_util'
import axios from 'axios'
import {addHouseSource,findProvinceList,findCityList,findDistrictList,
findStreetList,findHouseType,uploadHouseSaleFile } from './ReportHouseSourceService'
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

      },
      name:'',
      headers: 
      {
        authorization: 'authorization-text',
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
    beforeUpload(e){
      console.log(e)
    },
    showModal()
    {
      this.visible = true
    },
    reset()
    {
      console.log('还没做')
    },
    handleCancel()
    {
      this.visible=false
    },
    submitNewHouse()
    {
      let self=this
      
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
    uploadHandle(info)
    {
      
    },

  },

}
</script>
