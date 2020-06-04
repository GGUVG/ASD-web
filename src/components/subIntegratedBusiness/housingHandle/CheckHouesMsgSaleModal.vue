<template>
  <a-drawer
    title='待处理出售房源信息'
	  width="80%"
    @close="()=>handleCancel()"
    :destroyOnClose="true"
	  :visible=visible
  >
  <div>
          <a-form layout="horizontal">
          <div>
          <a-row>
            <a-col :md="6" >
              <a-form-item label="房源ID" :labelCol="{span: 4}" :wrapperCol="{span: 5, offset: 1}">
              <a-input-number v-model="criteria.houseId"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" >
              <a-form-item label="房源小区" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
              <a-input v-model="criteria.houseEstate"/>
              </a-form-item>
            </a-col>
            <a-col :md="4" >
              <a-form-item label="房源价格" :labelCol="{span: 7}" :wrapperCol="{span: 14, offset: 1}">
              <a-input-number v-model="criteria.startHousePrice"/>
              </a-form-item>
            </a-col>
            <a-col :md="4">
              <a-form-item label="至" :labelCol="{span: 3}" :wrapperCol="{span: 1, offset: 0}">
              <a-input-number v-model="criteria.endHousePrice"/>
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
                v-model="criteria.houseLocationProvince">
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
                v-model="criteria.houseLocationCity">
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
                v-model="criteria.houseLocationDistrict">
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
                v-model="criteria.houseLocationStreet">
                  <a-select-option v-for="s in streetData" :key="s" :value="s">
                  {{s}}
                  </a-select-option>
                </a-select>
              </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
              <a-form-item label="面积" :labelCol="{span: 2}" :wrapperCol="{span: 14, offset: 1}">
                <a-input-number v-model="criteria.startHouseSquare"/>
                <a-input-number v-model="criteria.endHouseSquare"/>
              </a-form-item>
              </a-col>
          </a-row>
          <a-row>
            <a-col :md="6" :sm="24">
              <a-form-item label="建成时间" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
              <a-input v-model="criteria.completeTime"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="客户名" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
                <a-input v-model="criteria.clientName"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="客户性别" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
                <a-select v-model="criteria.clientSex">
                <a-select-option value="男">男</a-select-option>
                <a-select-option value="女">女</a-select-option>
                </a-select> 
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="客户电话" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
                <a-input v-model="criteria.clientPhone"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :md="6" :sm="24">
              <a-form-item label="买方客户姓名" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
                <a-input v-model="criteria.wClientName"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="客户性别" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
                <a-select v-model="criteria.wClientSex">
                <a-select-option value="男">男</a-select-option>
                <a-select-option value="女">女</a-select-option>
                </a-select> 
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="客户电话" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
                <a-input v-model="criteria.wClientPhone"/> 
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="状态" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
                <a-select v-model="criteria.houseState">
                <a-select-option value="0">待售</a-select-option>
                <a-select-option value="1">已售</a-select-option>
                </a-select> 
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :md="6">
              <a-button type="primary" @click="reloadTable(1)">查询</a-button>
              <a-button @click="reset()">重置</a-button>
              <a-button>导出</a-button>
            </a-col>
          </a-row>
          </div>
          </a-form>
          </div>
           <div class="operator">
           <a-table id="table"
              :columns="columns"
              :rowKey="record => record.houseId"
              :dataSource="dataSource"
              :pagination="pagination"
              :loading="loading"
              @change="handleTableChange"
              size="middle"
              :scroll="{ x: 2400 }">
              <span slot="switchHouseState" slot-scope="record">
              <span v-if='record===0'>待售</span>
              <span v-if='record===1'>已售</span>
              </span>
              <span slot="action" slot-scope="record">
              <a href="javascript:;" @click="openUpdateHouse(record)">修改</a>
              </span>
            </a-table>
          </div>
  </a-drawer>
</template>
<script>
import moment from 'moment'
import VueCookies from 'vue-cookies'
import {getCookie} from '../../../server/utils'
import axios from 'axios'
const dataSource = []
const columns = [

  {
    title: '房源ID',
    dataIndex: 'houseId',
    key: 'houseId',
    width: 50,
    fixed: 'left'
  },
  {
    title: '门牌号',
    dataIndex: 'houseName',
    key: 'houseName',
    width: 150,
    fixed: 'left'
    
  },
  {
    title: '小区名',
    dataIndex: 'houseEstate',
    key: 'houseEstate'
  },
  {
    title: '省',
    dataIndex: 'houseLocationProvince',
    key: 'houseLocationProvince'
  },
  {
    title: '市',
    dataIndex: 'houseLocationCity',
    key: 'houseLocationCity'
  },
  {
    title: '区',
    dataIndex: 'houseLocationDistrict',
    key: 'houseLocationDistrict'
  },
  {
    title: '街',
    dataIndex: 'houseLocationStreet',
    key: 'houseLocationStreet'
  },
  {
    title: '价格/平',
    dataIndex: 'housePrice',
    key: 'housePrice'
  },
  {
    title: '面积/平',
    dataIndex: 'houseSquare',
    key: 'houseSquare'
  },
  {
    title: '房源状态',
    dataIndex: 'houseState',
    key: 'switchHouseState',
    scopedSlots: { customRender: 'switchHouseState' },
  },
  {
    title: '原业主客户ID',
    dataIndex: 'houseClientId',
    key: 'houseClientId'
  },
  {
    title: '建成时间',
    dataIndex: 'completeTime',
    key: 'completeTime'
  },
  {
    title: '交易时间',
    dataIndex: 'dealTime',
    key: 'dealTime'
  },
  {
    title: '(原业主)客户名',
    dataIndex: 'clientName',
    key: 'clientName'
  },
  {
    title: '客户性别',
    dataIndex: 'clientSex',
    key: 'clientSex'
  },
  {
    title: '客户电话',
    dataIndex: 'clientPhone',
    key: 'clientPhone'
  },
  {
    title: '客户所属员工ID',
    dataIndex: 'clientStaffId',
    key: 'clientStaffId',
    width: 80
  },
  {
    title: '(现)买方ID',
    dataIndex: 'housePurachaserId',
    key: 'housePurachaserId'
  },
  {
    title: '客户名',
    dataIndex: 'wClientName',
    key: 'wClientName'
  },
  {
    title: '客户性别',
    dataIndex: 'wClientSex',
    key: 'wClientSex'
  },
  {
    title: '客户电话',
    dataIndex: 'wClientPhone',
    key: 'wClientPhone'
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
    name: 'CheckHouseMsgSaleModal',
  data () 
  {
    return {
      visible: false,
      columns: columns,
      dataSource: dataSource,
      loading: false,
      provinceData:[],
      cityData:[],
      districtData:[],
      streetData:[],
      streetData:[],
      pagination: 
      {
        total: 0,
        pageSize: 5,
        current: 1,
        sortColumn: null,
        sort: 1
      },
      criteria: 
      {

      }
    }
  },
  mounted () 
  {
    this.getProvince()
    
  },
  watch:
  {
    /*监听测试用
    'criteria.houseLocationCity'(e)
    {
      console.log(e)
    }
    */
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
    console.log(JSON.stringify(pageReq))
    axios({
        url: "http://localhost:8080/v1/house/forSale/findPageHouseForSale",
        method: "POST",
        data:pageReq,
        headers:
          {
          'Accept': 'application/json',
          }
          }).then(res => {
          self.loading = false
          if (res.data) {
            console.log(res)
            const ret = res.data.data
            self.dataSource = ret.rows
            const pag = ret.pagination
            self.pagination = { total: pag.totalSize, pageSize: pag.pageSize, current: pag.pageNo }
            console.info('pag--->', pag)
          } else {
            self.$message.error('获取数据错误')
          }
          })
          .catch(err => {
          self.loading = false
          self.$message.error('获取数据错误')
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
    // 导出到Excel
    exportExcelDayliyBillRep() 
    {
      
    },
    openUpdateHouse()
    {
      
    },
    getProvince()
    {
      let self=this
      axios({
          url: "http://localhost:8080/v1/sys/Site/findProvinceList",
          method: "POST",
          data:'',
          headers:
          {
            'Accept': 'application/json',
          }
          }).then(res=>{
          //console.log('province',res)
          if (res) 
          {
          self.provinceData=res.data.data
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
      axios({
          url: "http://localhost:8080/v1/sys/Site/findCityList",
          method: "POST",
          data:province1,
          headers:
          {
            'Accept': 'application/json',
          }
          }).then(res=>{
          //console.log('city',res)
          if (res.status==200) 
          {
          self.cityData=res.data.data
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
      axios({
          url: "http://localhost:8080/v1/sys/Site/findDistrictList",
          method: "POST",
          data:city1,
          headers:
          {
            'Accept': 'application/json',
          }
          }).then(res=>{
          //console.log('district',res)
          if (res.status==200) 
          {
          self.districtData=res.data.data
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
      axios({
          url: "http://localhost:8080/v1/sys/Site/findStreetList",
          method: "POST",
          data:district1,
          headers:
          {
            'Accept': 'application/json',
          }
          }).then(res=>{
          //console.log('street',res)
          if (res.status==200) 
          {
          self.streetData=res.data.data
          }else
          { 
          self.streetData=[]
          self.$message.error('获取街菜单失败'); 
          console.log('street fail...',res)  
          }
          }).catch(err => {console.log(`err is ${err}`)})

    },
    filterOption(input, option) 
    {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
  },

}
</script>
