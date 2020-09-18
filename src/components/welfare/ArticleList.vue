<template >
    <Hello1>
    <template slot="middleContent">
        <template>
        <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="articleList">
        <div slot="footer"><b>www.baidu.com</b> 百度一下,你就知道</div>
            <a-list-item slot="renderItem" key="item.title" slot-scope="item">
            <!--解决浏览器Not allowed to load local resource 
              https://blog.csdn.net/alazyperson/article/details/105905824?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.edu_weight&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.edu_weight 
            -->
            <img
            slot="extra"
            width="272"
            alt="logo"
            :src=item.bgImg />
        <a-list-item-meta :description="item.secondaryTitle">
        <a slot="title" @click="openArticleDetail(item)"  style="cursor:pointer">{{ item.title }}</a>
        <a-avatar slot="avatar" :src="avatarImg" />
        </a-list-item-meta>
        {{ item.content }}
        </a-list-item>
        </a-list>
        </template>
    </template>
    </Hello1>
</template>
<script>
const listData = []
import Hello1 from '../Hello1'
import {findArticleByPage,findWelfareImgByPage} from './WelfareService'
import avatarBgImg from '../../assets/img/avatar/IMG_20180820_164059.jpg'
export default {
name:'newVue',
components:{
    Hello1
},
created()
{
    let TagVal1=this.$route.query.keyWord1
    let TagVal2=this.$route.query.keyWord2
    let TagVal3=this.$route.query.keyWord3
    let TagVal4=this.$route.query.keyWord4
    if(TagVal1!=null && TagVal1!= '')
    {
        this.criteria.keyWord1=TagVal1
    }
    if(TagVal2!=null && TagVal2!= '')
    {
        this.criteria.keyWord2=TagVal2    
    }
    if(TagVal3!=null && TagVal3!= '')
    {
        this.criteria.keyWord3=TagVal3    
    }
    if(TagVal4!=null && TagVal4!= '')
    {
        this.criteria.keyWord4=TagVal4    
    }
},
mounted () {
    this.reloadArticleList(1)
},
data () 
{
    return{
      listData,
      articleList:[],
      avatarImg:avatarBgImg,
      criteria:{
      },
      pagination: 
      {
        total: 0,
        pageSize: 7,
        current: 1,
        sortColumn: null,
        sort: 1
      },
    }
},
methods:{
    reloadArticleList(pageNo)
    {
    let self=this
    let p = self.pagination
    let currentPageNo = pageNo || p.current
    let criteria = self.criteria
    let pageReq = {
      pagination: { totalSize: p.total, pageSize: p.pageSize, pageNo: currentPageNo, sortColumn: p.sortColumn, sort: p.sort },
      criteria
    }
        findArticleByPage(pageReq).then(res=>{
            // console.log('reloadArticleList res...',res)
            if(res.status==0)
            {
                let ret=res.data.rows
                // console.log('ret',ret)
                self.articleList=ret
                self.articleList.map(val=>{
                  val.bgImg = 'http://127.0.0.1:9092/welfare/' + val.bgImg
                })
                // self.$message.success('加载文章列表...')
                // console.log('articleList:...',self.articleList)
            }else
            {
                self.$message.error('加载文章列表失败!'+res.message)
                return
            }
        })
    },
    openArticleDetail(item)
    {
        //不encodeUri加密的话,浏览器url直接暴露所有参数
        let params = encodeURI(JSON.stringify(item))
        this.$router.push({
        path: '/ArticleDetail',
        query: {
            params:params
        }
      })
    },
}
}
</script>