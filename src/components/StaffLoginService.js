import {request} from '../utils/RestClient'

export function loginRequest (tmp) {
    return request(('http://localhost:8080/v1/staff/staffLogin'), {
      method: 'POST',
      data: tmp
    })
  }