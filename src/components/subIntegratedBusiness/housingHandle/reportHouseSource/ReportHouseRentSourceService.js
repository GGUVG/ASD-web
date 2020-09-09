import {request,exportRequest} from '../../../../utils/RestClient'

/*
*新建新租赁房源审批报备
*/
export function addHouseSource(Req) {
    return request(('http://localhost:9091/v1/house/forRent/reportNewSource'), {
      method: 'POST',
      data: Req
    })
  }

/*
*上传文件
*/
export function uploadHouseRentFile (Req) {
  return request(('http://localhost:9091/v1/house/forRent/uploadHouseRentFile'), {
    method: 'POST',
    data: Req,
    headers:{
    'Content-Type': 'multipart/form-data'}
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
*获取小区列表
*/
export function findEstateByName (req) {
  return request(('http://localhost:9091/v1/estate/findEstateList'), 
  {
    method: 'POST',
    data: req,
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}