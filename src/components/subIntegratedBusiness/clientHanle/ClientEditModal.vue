<template>
    <a-drawer
    title='客户编辑'
	  width="40%"
    @close="()=>handleCancel()"
    :destroyOnClose="true"
	:visible=visible>
    <ClientEditModal ref="ClientEditModal" :updateOkCallback="updateOkCallback"></ClientEditModal>
    <a-form layout='vertical' ref="ClientEditForm" :form="form">
        <a-form-item label='客户ID'>
            <a-input v-model="criteria.clientId" read-only="read-only"/>
        </a-form-item>
        <a-form-item label='客户名'>
            <a-input v-model="criteria.clientName"/>
        </a-form-item>
        <a-form-item label='客户性别'>
            <a-input v-model="criteria.clientSex"/>
        </a-form-item>
        <a-form-item label='客户电话'>
            <a-input v-model="criteria.clientPhone"/>
        </a-form-item>
        <a-form-item label='客户地址省'>
            <a-select 
                id="houseLocationProvince"
                style="width: 120px" 
                showSearch
                allowClear:true
                ptionFilterProp="children"
                @focus="handleProvinceFocus"
                @change="handleProvinceChange" 
                @search="handleProvinceSearch"
                :filterOption="filterOption"
                v-model="criteria.clientExpectPlaceProvince">
                  <a-select-option v-for="p in provinceData" :key="p" :value="p">
                  {{p}}
                  </a-select-option>
                </a-select>
        </a-form-item>
        <a-form-item label='客户地址市'>
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
        </a-form-item>
        <a-form-item label='客户地址区'>
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
        </a-form-item>
        <a-form-item label='客户地址街道'>
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
        <a-form-item label='客户备注信息'>
            <a-input v-model="criteria.clientRemark"/>
        </a-form-item>
        <a-form-item label='客户期待价格'>
            <a-input v-model="criteria.clientExpectPrice"/>
        </a-form-item>
        <a-form-item label='客户期待面积'>
            <a-input v-model="criteria.clientExpectSquare"/>
        </a-form-item>
        <a-form-item label='客户期待地址省'>
            <a-input v-model="criteria.clientExpectPlaceProvince"/>
        </a-form-item>
        <a-form-item label='客户期待地址市'>
            <a-input v-model="criteria.clientExpectPlaceCity"/>
        </a-form-item>
        <a-form-item label='客户期待地址区'>
            <a-input v-model="criteria.clientExpectPlaceDistrict"/>
        </a-form-item>
        <a-form-item label='客户期待地址街道'>
            <a-input v-model="criteria.clientExpectPlaceStreet"/>
        </a-form-item>
    </a-form>
    <a-button :style="{marginRight: '8px'}" @click="handleCancel">取消</a-button>
    <a-button @click="handleUpdate" type="primary">更新</a-button>
    </a-drawer>
</template>
<script>
import { editClientForSale,findProvinceList,findCityList,findDistrictList,findStreetList } from './ClientMsgService'
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
const dataSource = []
export default 
{
    name: 'ClientEditModal',
    props: ['updateOkCallback'],
    components: 
    {
      
    },
  data () 
  {
      return{
        columns: columns,
        dataSource: [],
        visible: false,
        loading: false,
        typeCode: null,
        itemCode: null,
        pagination: {
            total: 0,
            pageSize: 10,
            current: 1,
            sortColumn: null,
            sort: 1
        },
        criteria:{
            clientId:'',
        },
        clientType:'',
        form:this.$form.createForm(this),
        provinceData:[],
        cityData:[],
        districtData:[],
        streetData:[],
      }
  },
  mounted()
  {
  },
  computed:
  {

  },
  methods:
  {
    showModal(recordParent,recordClientType)
    {
      this.visible = true
      this.criteria = recordParent
      this.clientType=recordClientType
      this.provinceData.push(this.criteria.clientAddressProvince)
      // console.log(this.provinceData[0])
    },
    reset()
    {
      this.criteria={}
    },
    handleCancel()
    {
      this.visible=false
    },
    initCriteria()
    {
      console.log('inint this.criteria....',this.criteria)
      this.provinceData.push(this.criteria.clientAddressProvince)
      console.log('init push....',this.provinceData)
    },
    handleUpdate()
    {
      console.log('update...')
      let self=this
      if(self.clientType=='10')
      {
        editClientForSale(self.criteria).then(res =>{
          if (res.status==0) 
          {
            self.$message.success('修改成功')
            self.handleCancel()
          }else
          {
          self.$message.error('修改失败'); 
          handleCancel() 
          }
          }).catch(err => {console.log(`err is ${err}`)})
      }else if(self.clientType=='20')
      {

      }else if(self.clientType=='30')
      {

      }else if(self.clientType=='40')
      {

      }else
      {
        self.$message.error('用户类型空')
      }
    },
    handleProvinceFocus()
    {
      this.getProvince()
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
    filterOption(input, option) 
    {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
  },

}
</script>