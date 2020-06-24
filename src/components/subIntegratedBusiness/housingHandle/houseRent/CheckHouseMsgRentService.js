import {request,exportRequest} from '../../../../utils/RestClient'

/*
*根据条件分页查询
*/
export function findBySearch (pageReq) {
    return request(('http://localhost:8080/v1/house/forRent/findPageHouseForRent'), {
      method: 'POST',
      data: pageReq
    })
  }

/*
*根据条件查询结果导出excel
*/
export function exportBySearch (pageReq) {
    return exportRequest(('http://localhost:8080/v1/house/forRent/exportFindHouseForRent'), {
      method: 'POST',
      data: pageReq,
      responseType: 'arraybuffer'
    })
  }

/*
*获取省级列表
*/
export function findProvinceList () {
  return request(('http://localhost:8080/v1/sys/Site/findProvinceList'), {
    method: 'POST'
  })
}

/*
*获取市级列表
*/
export function findCityList (req) {
  return request(('http://localhost:8080/v1/sys/Site/findCityList'), {
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
  return request(('http://localhost:8080/v1/sys/Site/findDistrictList'), {
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
  return request(('http://localhost:8080/v1/sys/Site/findStreetList'), {
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
  return request(('http://localhost:8080/v1/sys/HouseType/findHouseType'), 
  {
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}