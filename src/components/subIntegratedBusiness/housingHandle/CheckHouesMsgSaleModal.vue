<template>
  <a-drawer
    title='待处理出售房源信息'
	  width="80%"
    @ok="()=>handleOk()"
    @close="()=>handleCancel()"
    :destroyOnClose="true"
	  :visible=visible
  >
  <div>
          <a-form layout="horizontal">
          <div>
          <a-row>
            <a-col :md="6" >
              <!--废弃,员工id从后端cookie拿，从前端拿蠢得一批，正式环境删除
              <a-form-item label="员工ID" :labelCol="{span: 7}" :wrapperCol="{span: 14, offset: 1}">
                <a-input v-model="criteria.clientStaffId"/>
              </a-form-item>-->
              <a-form-item label="房源ID" :labelCol="{span: 7}" :wrapperCol="{span: 14, offset: 1}">
                <a-input v-model="criteria.houseId"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" > 
              <a-form-item label="房源小区" :labelCol="{span: 7}" :wrapperCol="{span: 14, offset: 1}">
                <a-input v-model="criteria.houseEstate"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" >
              <a-form-item label="房源位置" :labelCol="{span: 7}" :wrapperCol="{span: 14, offset: 1}">
              <a-select :default-value="provinceData[0]" style="width: 80px" @change="handleProvinceChange" v-model="criteria.houseLocationProvince">
              <a-select-option v-for="province in provinceData" :key="province">
              {{ province }}
              </a-select-option>
              </a-select>
              <a-select v-model="criteria.houseLocationCity" style="width: 80px">
              <a-select-option v-for="city in cities" :key="city">
              {{ city }}
              </a-select-option>
              </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :md="6" :sm="24">  
              <a-form-item label="房源价格" :labelCol="{span: 7}" :wrapperCol="{span: 14, offset: 1}">
                
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
            </a-col>
            <a-col :md="6" :sm="24">
            </a-col>
          </a-row>
          <a-row>
            <a-col :md="6">
              <a-button type="primary"  @click="reloadTable(1)">查询</a-button>
              <a-button  @click="reset()">重置</a-button>
              <a-button type="primary"  @click="exportExcelDayliyBillRep()">导出</a-button>
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
    title: '(现)买方ID',
    dataIndex: 'housePurachaserId',
    key: 'housePurachaserId'
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
    title: '客户地址',
    dataIndex: 'clientAddress',
    key: 'clientAddress'
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
      cities:[],
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
      // 导出到Excel
    exportExcelDayliyBillRep () 
    {
      
    },
    openUpdateHouse()
    {
      
    },

  },

}
</script>
