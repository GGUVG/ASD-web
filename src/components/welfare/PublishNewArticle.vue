<template>
  <a-drawer
    title='上传新文章'
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
              <a-form-model-item label="标题" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
              <a-input v-model="criteria.title"/>
              </a-form-model-item>
            </a-col>
            <a-col :md="6" >
              <a-form-model-item label="副标题" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
                <a-input v-model="criteria.secondaryTitle"/>
              </a-form-model-item>
            </a-col>
            <a-col :md="6" >
              <a-form-model-item label="一级分类" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
              <a-input v-model="criteria.primaryCategory"/>
              </a-form-model-item>
            </a-col>
            <a-col :md="6" >
              <a-form-model-item label="二级分类" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
              <a-input v-model="criteria.secondaryCategory"/>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
              <a-form-model-item label="内容" :labelCol="{span: 2}" :wrapperCol="{span: 14, offset: 1}">
                <a-input v-model="criteria.content" type="textarea" />
              </a-form-model-item>
          </a-row>
          <a-row>
            <a-col :md="6" :sm="24">
              <a-form-model-item label="关键词1" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
              <a-input v-model="criteria.keyWord1"/>
              </a-form-model-item>
            </a-col>
              <a-col :md="6" :sm="24">
              <a-form-model-item label="关键词2" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
              <a-input v-model="criteria.keyWord2"/>
              </a-form-model-item>
            </a-col>
              <a-col :md="6" :sm="24">
              <a-form-model-item label="关键词3" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
              <a-input v-model="criteria.keyWord3"/>
              </a-form-model-item>
            </a-col>
              <a-col :md="6" :sm="24">
              <a-form-model-item label="关键词4" :labelCol="{span: 5}" :wrapperCol="{span: 14, offset: 1}">
              <a-input v-model="criteria.keyWord4"/>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :md="6">
              <a-button type="primary" @click="submit('ruleForm')">提交</a-button>
              <a-button @click="reset()">重置</a-button>
            </a-col>
          </a-row>
          </div>
          </a-form-model>
          </div>
  </a-drawer>
</template>
<script>
import moment from 'moment'
import { FormModel } from 'ant-design-vue';
import VueCookies from 'vue-cookies'
import axios from 'axios'
import {submitNewArticle} from './WelfareService'
export default {
    name: 'PublishNewArticle',
  data () 
  {
    return {
      visible: false,
      loading: false,
      criteria:
      {

      },
      fileList:[],
      rules: {

      }
    }
  },
  mounted () 
  {

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
      this.reset()
      this.visible=false
    },
    submit(ruleForm)
    {
      let self=this
      let articleReq={
        title:self.criteria.title,
        secondaryTitle:self.criteria.secondaryTitle,
        modelName:self.criteria.modelName,
        content:self.criteria.content,
        primaryCategory:self.criteria.primaryCategory,
        secondaryCategory:self.criteria.secondaryCategory,
        thirdCategory:self.criteria.thirdCategory,
        hotValue:self.criteria.hotValue,
        keyWord1:self.criteria.keyWord1,
        keyWord2:self.criteria.keyWord2,
        keyWord3:self.criteria.keyWord3,
        keyWord4:self.criteria.keyWord4,

      }
      // let mandateSuffix=self.fileList[0].name
      self.$refs[ruleForm].validate(vaild =>{
        if(vaild)
        {
          alert('提交校验通过');
          submitNewArticle(self.criteria)
          .then(res => {
            this.loading = false
            if (res.status==0) {
              console.log(res)
              // this.handleUploadMaterial()
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
      let index = this.fileList.indexOf(file.originFileObj)
      let newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    beforeUpload(file) 
    {
      console.log("beforeUpload",file)
      let newFileNameSuffix=this.matchType(file.name)
      let newFileNameTxt='aaa'+newFileNameSuffix
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
        formData.append('imgFiles', file);
      }
      uploadImgFile(formData).then( (res) =>{
        if (res=='success')
        {
          self.$message.success('上传成功');
        }else
        {
          self.$message.error('上传失败');
        }
          self.fileList = [];
      }).catch(err => {console.log(`err is ${err}`)})
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
