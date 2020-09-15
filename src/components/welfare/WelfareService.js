import {request} from '../../utils/RestClient'

/*
**通常情况下根据文章号查出图片list
*/
export function findWelfareImgByPage (req) {
    return request(('http://localhost:9091/v1/welfare/findWelfareImgByPage'), {
      method: 'POST',
      data: req
    })
}

/*
**通常情况下根据文章号查出图片list
*/
export function findArticleByPage (req) {
    return request(('http://localhost:9091/v1/welfare/findArticleByPage'), {
      method: 'POST',
      data: req
    })
}