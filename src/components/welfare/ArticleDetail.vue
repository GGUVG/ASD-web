<template >
    <Hello1>
    <template slot="middleContent">
    <a-breadcrumb>
    <a-breadcrumb-item><router-link :to="'/ArticleList'">图库</router-link></a-breadcrumb-item>
    <a-breadcrumb-item><a @click="reloadImgList(1)"  style="cursor:pointer">详情</a></a-breadcrumb-item>
    </a-breadcrumb>
    <a-descriptions :title="article.title" :column=1>
        <a-descriptions-item>
        {{article.secondaryTitle}}
        </a-descriptions-item>
        <a-descriptions-item>
        {{article.content}}
        </a-descriptions-item>
        <a-descriptions-item>
        {{article.primaryCategoryTxt}}
        </a-descriptions-item>
        <a-descriptions-item>
        {{article.secondaryCategoryTxt}}
        </a-descriptions-item>
        <a-descriptions-item>
        {{article.publishTime}}
        </a-descriptions-item>
    </a-descriptions>
    <template>
    <a-list 
    item-layout="vertical" 
    size="large" :pagination="pagination" :data-source="imgList" style="text-align:center" >
        <a-list-item slot="renderItem" key="item.title" slot-scope="item">
        <img :src="item.photoName"  style="width: auto;height: auto;" alt="avatar" />
        </a-list-item>
    </a-list>
    </template>
    <a-descriptions title="相关标签" :column=4>
        <a-descriptions-item>
        <a-tag color="pink"><a @click="findArticleListByTag1(article.keyWord1)" style="cursor:pointer">{{article.keyWord1}}</a></a-tag>
        </a-descriptions-item>
        <a-descriptions-item>
        <a-tag color="pink"><a @click="findArticleListByTag2(article.keyWord2)" style="cursor:pointer">{{article.keyWord2}}</a></a-tag>
        </a-descriptions-item>
        <a-descriptions-item>
        <a-tag color="pink"><a @click="findArticleListByTag3(article.keyWord3)" style="cursor:pointer">{{article.keyWord3}}</a></a-tag>
        </a-descriptions-item>
        <a-descriptions-item>
        <a-tag color="pink"><a @click="findArticleListByTag4(article.keyWord4)" style="cursor:pointer">{{article.keyWord4}}</a></a-tag>
        </a-descriptions-item>
    </a-descriptions>
    </template>
    </Hello1>
</template>
<script>
import Hello1 from '../Hello1'
import {findWelfareImgByPage} from './WelfareService'
export default {
name:'newVue',
components:{
    Hello1
},
created()
{
    let params=this.$route.query.params
    let val=JSON.parse(decodeURI(params))
    this.article=val
    this.criteria.articleId=val.id
    console.log('this.article',this.article)
    this.reloadImgList(1)
},
mounted () {
    
},
data () 
{
    return{
        article:{

        },
        imgList:[],
        pagination: {
        // total: 0,
        pageSize: 5,
        // current: 1,
        // sortColumn: null,
        // sort: 1
      },
      criteria:{
        articleId:null
      }
    }
},
methods:{
    reloadImgList(pageNo)
    {

        let self=this
        let p = self.pagination
        let currentPageNo = pageNo || p.current
        let criteria = self.criteria
        let pageReq = {
        pagination: { totalSize: p.total, pageSize: p.pageSize, pageNo: currentPageNo, sortColumn: p.sortColumn, sort: p.sort },
        criteria
        }
        findWelfareImgByPage(pageReq).then(res=>{
            console.log('reloadImgList res...',res)
            if(res.status==0)
            {
                let ret=res.data.rows
                // console.log('ret',ret)
                self.imgList=ret
                self.imgList.map(val=>{
                  val.photoName = 'http://127.0.0.1:9092/welfare/' + val.photoName
                })
                let pag = res.data.pagination
                self.pagination = { total: pag.totalSize, pageSize: pag.pageSize, current: pag.pageNo,onChange:self.handleTableChange }
            }else
            {
                self.$message.error('加载图片列表失败!'+res.message)
                return
            }
        })
    },
    handleTableChange(page)
    {
    //   console.log(page)
      this.reloadImgList(page)
    },
    findArticleListByTag1(tag)
    {
        console.log('findArticleListByTag tag1...',tag)
        this.$router.push({
        path: '/ArticleList',
        query: {
            keyWord1:tag
        }
      })
    },
    findArticleListByTag2(tag)
    {
        console.log('findArticleListByTag tag2...',tag)
        this.$router.push({
        path: '/ArticleList',
        query: {
            keyWord2:tag
        }
      })
    },
    findArticleListByTag3(tag)
    {
        console.log('findArticleListByTag tag3...',tag)
        this.$router.push({
        path: '/ArticleList',
        query: {
            keyWord3:tag
        }
      })
    },
    findArticleListByTag4(tag)
    {
        console.log('findArticleListByTag tag4...',tag)
        this.$router.push({
        path: '/ArticleList',
        query: {
            keyWord4:tag
        }
      })
    },
}
}
</script>
<style scoped>
#a-list-layout {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>