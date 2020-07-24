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
            <a-input v-model="criteria.clientAddressProvince"/>
        </a-form-item>
        <a-form-item label='客户地址市'>
            <a-input v-model="criteria.clientAddressCity"/>
        </a-form-item>
        <a-form-item label='客户地址区'>
            <a-input v-model="criteria.clientAddressDistrict"/>
        </a-form-item>
        <a-form-item label='客户地址街道'>
            <a-input v-model="criteria.clientAddressStreet"/>
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

      }
  },
  mounted()
  {
      console.log('clientEditModal criteria...',this.criteria)
  },
  computed:
  {

  },
  methods:
  {
    showModal(recordParent,recordClientType)
    {
      this.visible = true
      console.log('recordClientType....',recordClientType)
      this.criteria = recordParent
    },
    reset()
    {
      this.criteria={}
    },
    handleCancel()
    {
      this.visible=false
    },
    handleUpdate()
    {
      console.log('update...')
      let self=this
      if(self.clientType=='10')
      {

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
  },

}
</script>