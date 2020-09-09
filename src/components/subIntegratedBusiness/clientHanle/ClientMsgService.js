import {request,exportRequest} from '../../../utils/RestClient'

/*
*根据条件分页出售客户查询
*/
export function findBySearchClientSale (pageReq) {
    return request(('http://localhost:9091/v1/client/findPageClientSale'), {
      method: 'POST',
      data: pageReq
    })
  }

/*
*根据条件分页出租客户查询
*/
export function findBySearchClientRent (pageReq) {
  return request(('http://localhost:9091/v1/client/findPageClientRent'), {
    method: 'POST',
    data: pageReq
  })
}

/*
*根据条件分页意向购房客户查询
*/
export function findBySearchClientWantBuy (pageReq) {
  return request(('http://localhost:9091/v1/client/findPageClientWantBuy'), {
    method: 'POST',
    data: pageReq
  })
}

/*
*根据条件分页意向购房客户查询
*/
export function findBySearchClientWantRent (pageReq) {
  return request(('http://localhost:9091/v1/client/findPageClientWantRent'), {
    method: 'POST',
    data: pageReq
  })
}

/*
*根据出售客户条件查询结果导出excel
*/
export function exportBySearchClientSale (pageReq) {
    return exportRequest(('http://localhost:9091/v1/client/exportFindCLientSale'), {
      method: 'POST',
      data: pageReq,
      responseType: 'arraybuffer'
    })
  }

/*
*根据出租客户条件查询结果导出excel
*/
export function exportBySearchClientRent (pageReq) {
  return exportRequest(('http://localhost:9091/v1/client/exportFindCLientRent'), {
    method: 'POST',
    data: pageReq,
    responseType: 'arraybuffer'
  })
}

/*
*根据意向购房客户条件查询结果导出excel
*/
export function exportBySearchClientWantBuy (pageReq) {
  return exportRequest(('http://localhost:9091/v1/client/exportFindCLientWantBuy'), {
    method: 'POST',
    data: pageReq,
    responseType: 'arraybuffer'
  })
}

/*
*根据意向租房客户条件查询结果导出excel
*/
export function exportBySearchClientWantRent (pageReq) {
  return exportRequest(('http://localhost:9091/v1/client/exportFindCLientWantRent'), {
    method: 'POST',
    data: pageReq,
    responseType: 'arraybuffer'
  })
}

/*
*获取省级列表
*/
export function findProvinceList () {
  return request(('http://localhost:9091/v1/sys/Site/findProvinceList'), {
    method: 'POST'
  })
}

/*
*获取市级列表
*/
export function findCityList (req) {
  return request(('http://localhost:9091/v1/sys/Site/findCityList'), {
    method: 'POST',
    data: req,
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}

/*
*获取区级列表
*/
export function findDistrictList (req) {
  return request(('http://localhost:9091/v1/sys/Site/findDistrictList'), {
    method: 'POST',
    data: req,
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}

/*
*获取街级列表
*/
export function findStreetList (req) {
  return request(('http://localhost:9091/v1/sys/Site/findStreetList'), {
    method: 'POST',
    data: req,
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}

/*
*获取房屋类型列表
*/
export function findHouseType () {
  return request(('http://localhost:9091/v1/sys/HouseType/findHouseType'), 
  {
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}

/*
*更新卖房客户
*/
export function editClientForSale (Req) {
  return request(('http://localhost:9091/v1/client/editClientForSale'), {
    method: 'POST',
    data: Req
  })
}