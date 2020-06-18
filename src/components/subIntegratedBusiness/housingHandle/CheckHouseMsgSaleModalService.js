import {request,exportRequest} from '../../../utils/RestClient'

/*
*
*/
export function findBySearch (pageReq) {
    return request(('http://localhost:8080/v1/house/forSale/findPageHouseForSale'), {
      method: 'POST',
      data: pageReq
    })
  }

  export function exportBySearch (pageReq) {
    return exportRequest(('http://localhost:8080/v1/house/forSale/exportFindHouseForSale'), {
      method: 'POST',
      data: pageReq,
      responseType: 'arraybuffer'
    })
  }

  export function findProvinceList () {
    return request(('http://localhost:8080/v1/sys/Site/findProvinceList'), {
      method: 'POST'
    })
  }

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