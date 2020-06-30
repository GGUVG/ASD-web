import {request,exportRequest} from '../../../../utils/RestClient'

/*
*根据条件分页查询
*/
export function addHouseSource(Req) {
    return request(('http://localhost:8080/v1/house/forSale/reportNewSource'), {
      method: 'POST',
      data: Req
    })
  }

/*
*上传文件
*/
export function uploadHouseSaleFile (Req) {
  return request(('http://localhost:8080/v1/house/forSale/uploadHouseSaleFile'), {
    method: 'POST',
    data: Req,
    headers:{
    'Content-Type': 'multipart/form-data'}
  })
}

/*
*删除上传文件
*/
export function delUploadHouseSaleFile (Req) {
  return request(('http://localhost:8080/v1/house/forSale/delHouseSaleFile'), {
    method: 'POST',
    data: Req
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

/*
*获取小区列表
*/
export function findEstateByName (req) {
  return request(('http://localhost:8080/v1/estate/findEstateList'), 
  {
    method: 'POST',
    data: req,
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}