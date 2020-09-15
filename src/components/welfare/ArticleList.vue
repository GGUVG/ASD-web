<template >
    <Hello1>
    <template slot="middleContent">
        <template>
        <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
        <div slot="footer"><b>无圣光套图</b> GGUVG</div>
            <a-list-item slot="renderItem" key="item.title" slot-scope="item">
            <template v-for="{ type, text } in actions" slot="actions">
            <span :key="type">
            <a-icon :type="type" style="margin-right: 8px" />
            {{ text }}
            </span>
            </template>
            <img
            slot="extra"
            width="272"
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
        <a-list-item-meta :description="item.description">
        <a slot="title" :href="item.href">{{ item.title }}</a>
        <a-avatar slot="avatar" :src="item.avatar" />
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
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://www.antdv.com/',
    title: `ant design vue part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}
import Hello1 from '../Hello1'
import {findArticleByPage,findWelfareImgByPage} from './WelfareService'
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
        pagination: {
        onChange: page => {
          console.log(page);
        },
        pageSize: 3,
      },
      actions: [
        { type: 'star-o', text: '156' },
        { type: 'like-o', text: '156' },
        { type: 'message', text: '2' },
      ],
      articleList:[],
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
                self.$message.success('加载文章列表...')
                // console.log('articleList:...',self.articleList)
            }else
            {
                self.$message.error('加载文章列表失败!'+res.message)
            }
        })
    }
}
}
</script>