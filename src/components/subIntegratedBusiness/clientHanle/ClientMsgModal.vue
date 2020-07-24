<template>
  <a-drawer
    title='客户信息'
	  width="80%"
    @close="()=>handleCancel()"
    :destroyOnClose="true"
	  :visible=visible
  >
  <ClientEditModal ref="ClientEditModal" :updateOkCallback="updateOkCallback"></ClientEditModal>
  <div>
          <a-form layout="horizontal" :form="form">
          <div>
          <a-row>
            <a-col :md="6" >
              <a-form-item label="客户ID" :labelCol="{span: 4}" :wrapperCol="{span: 5, offset: 1}">
              <a-input-number v-model="criteria.clientId"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" >
              <a-form-item label="客户名" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
              <a-input v-model="criteria.clientName"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" >
              <a-form-item label="客户性别" :labelCol="{span: 5}" :wrapperCol="{span: 5, offset: 1}">
              <a-select v-model="criteria.clientSex">
                <a-select-option value='男'>男</a-select-option>
                <a-select-option value='女'>女</a-select-option>
              </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" >
              <a-form-item label="客户电话" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
              <a-input v-model="criteria.clientPhone"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :md="16" :sm="24">
              <a-form-item label="位置" :labelCol="{span: 1}" :wrapperCol="{span: 14, offset: 1}">
                <a-select 
                id="houseLocationProvince"
                style="width: 120px" 
                showSearch
                allowClear:true
                ptionFilterProp="children"
                @change="handleProvinceChange" 
                @search="handleProvinceSearch"
                :filterOption="filterOption"
                v-model="criteria.clientAddressProvince">
                  <a-select-option v-for="p in provinceData" :key="p" :value="p">
                  {{p}}
                  </a-select-option>
                </a-select>
                <a-select
                id="houseLocationCity"
                style="width: 120px" 
                showSearch
                ptionFilterProp="children"
                @change="handleCityChange" 
                @search="handleCitySearch"
                @focus="handleCityFocus"
                :filterOption="filterOption"
                v-model="criteria.clientAddressCity">
                  <a-select-option v-for="c in cityData" :key="c" :value="c">
                  {{c}}
                  </a-select-option>
                </a-select>
                <a-select
                id="houseLocationDistrict" 
                style="width: 120px"
                showSearch
                ptionFilterProp="children"
                @change="handleDistrictChange" 
                @search="handleDistrictSearch"
                @focus="handleDistrictFocus"
                :filterOption="filterOption"
                v-model="criteria.clientAddressDistrict">
                  <a-select-option v-for="d in districtData" :key="d" :value="d">
                  {{d}}
                  </a-select-option>
                </a-select>
                <a-select
                id="houseLocationStreet" 
                style="width: 120px"
                showSearch
                ptionFilterProp="children"
                @change="handleStreetChange" 
                @search="handleStreetSearch"
                @focus="handleStreetFocus"
                :filterOption="filterOption"
                v-model="criteria.clientAddressStreet">
                  <a-select-option v-for="s in streetData" :key="s" :value="s">
                  {{s}}
                  </a-select-option>
                </a-select>
              </a-form-item>
              </a-col>
              <a-col :md="6" :sm="24">
              <a-form-item label="客户备注" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
                <a-input v-model="criteria.clientRemark"/>
              </a-form-item>
              </a-col>
          </a-row>
          <a-row>
            <a-col :md="6" >
              <a-form-item label="面积/平" :labelCol="{span: 2}" :wrapperCol="{span: 14, offset: 1}">
              <a-input-number v-model="criteria.startClientExpectSquare"/>
              <a-input-number v-model="criteria.endClientExpectSquare"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" >
              <a-form-item label="价格/月" :labelCol="{span: 2}" :wrapperCol="{span: 14, offset: 1}">
              <a-input-number v-model="criteria.startClientExpectPrice"/>
              <a-input-number v-model="criteria.endClientExpectPrice"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row v-if="this.clientType==30 || this.clientType==40">
            <a-col :md="16" :sm="24">
              <a-form-item label="期待位置" :labelCol="{span: 2}" :wrapperCol="{span: 14, offset: 1}">
                <a-select 
                id="houseLocationProvince"
                style="width: 120px" 
                showSearch
                allowClear:true
                ptionFilterProp="children"
                @change="handleProvinceChange" 
                @search="handleProvinceSearch"
                :filterOption="filterOption"
                v-model="criteria.clientExpectPlaceProvince">
                  <a-select-option v-for="p in provinceData" :key="p" :value="p">
                  {{p}}
                  </a-select-option>
                </a-select>
                <a-select
                id="houseLocationCity"
                style="width: 120px" 
                showSearch
                ptionFilterProp="children"
                @change="handleCityChange" 
                @search="handleCitySearch"
                @focus="handleCityFocus"
                :filterOption="filterOption"
                v-model="criteria.clientExpectPlaceCity">
                  <a-select-option v-for="c in cityData" :key="c" :value="c">
                  {{c}}
                  </a-select-option>
                </a-select>
                <a-select
                id="houseLocationDistrict" 
                style="width: 120px"
                showSearch
                ptionFilterProp="children"
                @change="handleDistrictChange" 
                @search="handleDistrictSearch"
                @focus="handleDistrictFocus"
                :filterOption="filterOption"
                v-model="criteria.clientExpectPlaceDistrict">
                  <a-select-option v-for="d in districtData" :key="d" :value="d">
                  {{d}}
                  </a-select-option>
                </a-select>
                <a-select
                id="houseLocationStreet" 
                style="width: 120px"
                showSearch
                ptionFilterProp="children"
                @change="handleStreetChange" 
                @search="handleStreetSearch"
                @focus="handleStreetFocus"
                :filterOption="filterOption"
                v-model="criteria.clientExpectPlaceStreet">
                  <a-select-option v-for="s in streetData" :key="s" :value="s">
                  {{s}}
                  </a-select-option>
                </a-select>
              </a-form-item>
              </a-col>
              <a-col :md="6" :sm="24">
              <a-form-item label="" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">

              </a-form-item>
              </a-col>
          </a-row>
          <a-row>
            <a-col :md="6" :sm="24">
              <a-form-item label="客户类型" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
              <a-select  v-model="clientType">
                <a-select-option value='10'>出售</a-select-option>
                <a-select-option value='20'>出租</a-select-option>
                <a-select-option value='30'>意向买房</a-select-option>
                <a-select-option value='40'>意向租房</a-select-option>
              </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :md="6">
              <a-button type="primary" @click="reloadTable(1)">查询</a-button>
              <a-button @click="reset()">重置</a-button>
              <a-button @click="exportExcelBySearch()">导出</a-button>
            </a-col>
          </a-row>
          </div>
          </a-form>
          </div>
           <div class="operator">
           <a-table v-if="(this.clientType==10 || this.clientType==20)"
              id="table"
              :columns="columns"
              :rowKey="record => record.clientId"
              :dataSource="dataSource"
              :pagination="pagination"
              :loading="loading"
              @change="handleTableChange"
              size="middle"
              :scroll="{ x: 2400 }">
              <span slot="action" slot-scope="record">
              <a href="javascript:;" @click="openClientEditModal(record,clientType)">修改</a>
              </span>
            </a-table>
            <a-table v-else-if="(this.clientType==30 || this.clientType==40)"
              id="table"
              :columns="columnsEx"
              :rowKey="record => record.clientId"
              :dataSource="dataSource"
              :pagination="pagination"
              :loading="loading"
              @change="handleTableChange"
              size="middle"
              :scroll="{ x: 2400 }">
              <span slot="action" slot-scope="record">
              <a href="javascript:;" @click="openClientEditModal(record,clientType)">修改</a>
              </span>
            </a-table>
            <a-table v-else
              id="table"
              :columns="columns"
              :rowKey="record => record.clientId"
              :dataSource="dataSource"
              :pagination="pagination"
              :loading="loading"
              @change="handleTableChange"
              size="middle"
              :scroll="{ x: 2400 }">
              <span slot="action" slot-scope="record">
              <a href="javascript:;" @click="openClientEditModal(record,clientType)">修改</a>
              
              </span>
            </a-table>
          </div>
          
  </a-drawer>
</template>
<script>
import moment from 'moment'
import VueCookies from 'vue-cookies'
import ClientEditModal from './ClientEditModal'
import { copyReqObj, exportExcel,getAppointCookie } from '../../../utils/common_util'
import {findBySearchClientSale,findBySearchClientRent,findBySearchClientWantBuy,
findBySearchClientWantRent,exportBySearchClientSale,exportBySearchClientRent,exportBySearchClientWantBuy,
exportBySearchClientWantRent,findProvinceList,findCityList,findDistrictList,findStreetList, } from './ClientMsgService'
const dataSource = []
const columns= [

  {
    title: '客户ID',
    dataIndex: 'clientId',
    key: 'clientId',
    width: 50,
    fixed: 'left'
  },
  {
    title: '客户名',
    dataIndex: 'clientName',
    key: 'clientName',
  },
  {
    title: '客户性别',
    dataIndex: 'clientSex',
    key: 'clientSex',
  },
  {
    title: '省',
    dataIndex: 'clientAddressProvince',
    key: 'clientAddressProvince'
  },
  {
    title: '市',
    dataIndex: 'clientAddressCity',
    key: 'clientAddressCity'
  },
  {
    title: '区',
    dataIndex: 'clientAddressDistrict',
    key: 'clientAddressDistrict'
  },
  {
    title: '街',
    dataIndex: 'clientAddressStreet',
    key: 'clientAddressStreet'
  },
  {
    title: '客户电话',
    dataIndex: 'clientPhone',
    key: 'clientPhone'
  },
  {
    title: '客户备注',
    dataIndex: 'clientRemark',
    key: 'clientRemark'
  },
  {
    title: '客户所属员工ID',
    dataIndex: 'clientStaffId',
    key: 'clientStaffId'
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    scopedSlots: { customRender: 'action' },
    width: 160
  }
]
const columnsEx = [

  {
    title: '客户ID',
    dataIndex: 'clientId',
    key: 'clientId',
    width: 50,
    fixed: 'left'
  },
  {
    title: '客户名',
    dataIndex: 'clientName',
    key: 'clientName',
  },
  {
    title: '客户性别',
    dataIndex: 'clientSex',
    key: 'clientSex',
  },
  {
    title: '省',
    dataIndex: 'clientAddressProvince',
    key: 'clientAddressProvince'
  },
  {
    title: '市',
    dataIndex: 'clientAddressCity',
    key: 'clientAddressCity'
  },
  {
    title: '区',
    dataIndex: 'clientAddressDistrict',
    key: 'clientAddressDistrict'
  },
  {
    title: '街',
    dataIndex: 'clientAddressStreet',
    key: 'clientAddressStreet'
  },
  {
    title: '客户电话',
    dataIndex: 'clientPhone',
    key: 'clientPhone'
  },
  {
    title: '客户备注',
    dataIndex: 'clientRemark',
    key: 'clientRemark'
  },
  {
    title: '期待省',
    dataIndex: 'clientExpectPlaceProvince',
    key: 'clientExpectPlaceProvince'
  },
  {
    title: '期待市',
    dataIndex: 'clientExpectPlaceCity',
    key: 'clientExpectPlaceCity'
  },
  {
    title: '期待区',
    dataIndex: 'clientExpectPlaceDistrict',
    key: 'clientExpectPlaceDistrict'
  },
  {
    title: '期待街',
    dataIndex: 'clientExpectPlaceStreet',
    key: 'clientExpectPlaceStreet'
  },
  {
    title: '期待租价',
    dataIndex: 'clientExpectPrice',
    key: 'clientExpectPrice'
  },
  {
    title: '期待面积',
    dataIndex: 'clientExpectSquare',
    key: 'clientExpectSquare'
  },
  {
    title: '客户所属员工ID',
    dataIndex: 'clientStaffId',
    key: 'clientStaffId'
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    scopedSlots: { customRender: 'action' },
    width: 160
  }
]
export default {
    name: 'ClientMsgModal',
    components: 
    {
      ClientEditModal,
    },
  data () 
  {
    return {
      form:this.$form.createForm(this),
      visible: false,
      columns: columns,
      columnsEx:columnsEx,
      dataSource: dataSource,
      loading: false,
      provinceData:[],
      cityData:[],
      districtData:[],
      streetData:[],
      pagination: 
      {
        total: 0,
        pageSize: 7,
        current: 1,
        sortColumn: null,
        sort: 1
      },
      criteria: 
      {
        
      },
      clientType:'',
    }
  },
  mounted () 
  {
    this.getProvince()
    this.updateOkCallback.bind(this)
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
      this.criteria={}
      this.clientType=''
    },
    handleCancel()
    {
      this.visible=false
    },
    handleTableChange(pagination, filters, sorter)
    {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      pager.sortColumn = sorter.field
      pager.sort = sorter.order == 'descend' ? 2 : 1
      this.pagination = pager
      this.reloadTable()
    },
    reset()
    {
      this.criteria={}
    },
    reloadTable(pageNo)
    {
    const self = this
    const p = self.pagination
    const currentPageNo = pageNo || p.current
    const criteria = self.criteria
    const pageReq = {
      pagination: { totalSize: p.total, pageSize: p.pageSize, pageNo: currentPageNo, sortColumn: p.sortColumn, sort: p.sort },
      criteria
    }
    if(self.clientType==10)
    {
      findBySearchClientSale(pageReq).then(res => {
      self.loading = false
      if (res.data) {
        const ret = res.data
        self.dataSource = ret.rows
        const pag = ret.pagination
        self.pagination = { total: pag.totalSize, pageSize: pag.pageSize, current: pag.pageNo }
        } else {
          self.$message.error('获取数据错误')
          }
          })
          .catch(err => {
          self.loading = false
          self.$message.error('error')
          console.log(`err is ${err}`)
          })
    }else if(self.clientType==20)
    {
      findBySearchClientRent(pageReq).then(res => {
      self.loading = false
      if (res.data) {
        const ret = res.data
        self.dataSource = ret.rows
        const pag = ret.pagination
        self.pagination = { total: pag.totalSize, pageSize: pag.pageSize, current: pag.pageNo }
        } else {
          self.$message.error('获取数据错误')
          }
          })
          .catch(err => {
          self.loading = false
          self.$message.error('error')
          console.log(`err is ${err}`)
          })
    }else if(self.clientType==30)
    {
      findBySearchClientWantBuy(pageReq).then(res => {
      self.loading = false
      if (res.data) {
        const ret = res.data
        self.dataSource = ret.rows
        const pag = ret.pagination
        self.pagination = { total: pag.totalSize, pageSize: pag.pageSize, current: pag.pageNo }
        } else {
          self.$message.error('获取数据错误')
          }
          })
          .catch(err => {
          self.loading = false
          self.$message.error('error')
          console.log(`err is ${err}`)
          })
    }else if(self.clientType==40)
    {
      findBySearchClientWantRent(pageReq).then(res => {
      self.loading = false
      if (res.data) {
        const ret = res.data
        self.dataSource = ret.rows
        const pag = ret.pagination
        self.pagination = { total: pag.totalSize, pageSize: pag.pageSize, current: pag.pageNo }
        } else {
          self.$message.error('获取数据错误')
          }
          })
          .catch(err => {
          self.loading = false
          self.$message.error('error')
          console.log(`err is ${err}`)
          })
    }
    else
    {
      self.$message.error('用户类型为空')
      console.log(`err is ${err}`)
    }
        
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
    // 导出到Excel
    exportExcelBySearch() 
    {
      let self=this
      let req=this.criteria
      if(self.clientType==10)
      {
          exportBySearchClientSale(req).then(res => {
          self.loading = false
          if (res.data) {
          let headers1 = res.headers.filename
          exportExcel(res.data, headers1)
          self.loading = false
          }
          })
          .catch(err => {
          self.loading = false
          self.$message.error('导出失败')
          console.log(`err is ${err}`)
          })
      }else if(self.clientType==20)
      {
        exportBySearchClientRent(req).then(res => {
          self.loading = false
          if (res.data) {
          let headers1 = res.headers.filename
          exportExcel(res.data, headers1)
          self.loading = false
          }
          })
          .catch(err => {
          self.loading = false
          self.$message.error('导出失败')
          console.log(`err is ${err}`)
          })
      }else if(self.clientType==30)
      {
        exportBySearchClientWantBuy(req).then(res => {
          self.loading = false
          if (res.data) {
          let headers1 = res.headers.filename
          exportExcel(res.data, headers1)
          self.loading = false
          }
          })
          .catch(err => {
          self.loading = false
          self.$message.error('导出失败')
          console.log(`err is ${err}`)
          })
      }else if(self.clientType==40)
      {
        exportBySearchClientWantRent(req).then(res => {
          self.loading = false
          if (res.data) {
          let headers1 = res.headers.filename
          exportExcel(res.data, headers1)
          self.loading = false
          }
          })
          .catch(err => {
          self.loading = false
          self.$message.error('导出失败')
          console.log(`err is ${err}`)
          })
      }else
      {
        console.log('clientType null,export fail...')
      }
    },
    openUpdateHouse()
    {
      
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
    openClientEditModal(record,clientType)
    {
      this.$refs.ClientEditModal.showModal(record,this.clientType)
    },
    // 更新客户信息成功后的反馈
    updateOkCallback () {
		  this.reloadTable(1)
    },
  },

}
</script>
