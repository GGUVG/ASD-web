<template >
    <Hello1>
    <template slot="middleContent">
        <template>
        <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="articleList">
        <div slot="footer"><b>www.baidu.com</b> 百度一下,你就知道</div>
            <a-list-item slot="renderItem" key="item.title" slot-scope="item">
            <!-- <template v-for="{ type, text } in actions" slot="actions">
            <span :key="type">
            <a-icon :type="type" style="margin-right: 8px" />
            {{ text }}
            </span>
            </template> -->
            <!--解决浏览器Not allowed to load local resource 
              https://blog.csdn.net/alazyperson/article/details/105905824?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.edu_weight&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.edu_weight 
            -->
            <img
            slot="extra"
            width="272"
            alt="logo"
            :src=item.bgImg />
        <a-list-item-meta :description="item.secondaryTitle">
        <a slot="title" :href="item.href">{{ item.title }}</a>
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
                console.log('ret',ret)
                self.articleList=ret
                self.articleList.map(val=>{
                  val.bgImg = 'http://127.0.0.1:9092/welfare/' + val.bgImg
                })
                // self.$message.success('加载文章列表...')
                console.log('articleList:...',self.articleList)
            }else
            {
                self.$message.error('加载文章列表失败!'+res.message)
                return
            }
        })
    }
}
}
</script>