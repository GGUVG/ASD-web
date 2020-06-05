import { request, appendApiPrefix, appendDolphinApiPrefix } from './RestClient'
const moment = require('moment')

export function copyReqObj (reqObj) {
  const resultObj = {}
  for (const key in reqObj) {
    const value = reqObj[key]
    if (Object.prototype.toString.call(value) === '[object String]') {
      if (value.trim() !== '') {
        resultObj[key] = value
      }
    } else {
      resultObj[key] = value
    }
  }
  return resultObj
}
/**
 * 将 reqObj 下不为空的同属性部分 赋值给 returnObj
 * @param {} returnObj
 * @param {*} reqObj
 */
export function copyReqCommProp2Ret (returnObj, reqObj) {
  const resultObj = returnObj
  for (const key in reqObj) {
    if (key in resultObj) {
      resultObj[key] = reqObj[key]
    }
  }
  return resultObj
}
// 数字转二进制 Bits是位数
export function binary (num, Bits) {
  var str = num.toString(2)
  var total = parseInt(str, 2)
  // 补0操作
  if (Bits) {
    if (Bits > str.length) {
      if (total < num) {
        str = str.padEnd(Bits, '0')
      } else {
        str = str.padStart(Bits, '0')
      }
    }
  }
  return str
}
/**
 * 保留两位小数 ，并千分位化
 * @param {*} s
 * @param {*} n  保留位数，默认2位
 */
export function fixedAndthousandth (s, n) {
  if (s === undefined || s === null) return '0.00'
  n = n > 0 && n <= 20 ? n : 2
  if (s === 0) {
    return 0
  } else if (s < 1000) {
    return parseFloat(s).toFixed(2)
  } else {
    // eslint-disable-next-line no-useless-escape
    s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''
    var left = s.split('.')[0]
    var right = s.split('.')[1]
    return thousandth(left, n) + '.' + right
  }
}
/**
 * 数据千分位格式化
 * @param {*} num
 */
export function thousandth (num) {
  if (parseFloat(num) < 1000) return num
  var result = []; var counter = 0
  num = (num || 0).toString().split('')
  for (var i = num.length - 1; i >= 0; i--) {
    counter++
    result.unshift(num[i])
    if (!(counter % 3) && i !== 0) { result.unshift(',') }
  }
  return result.join('')
}

export function toDigitUppercase (n) {
  var fraction = ['角', '分']
  var digit = [
    '零', '壹', '贰', '叁', '肆',
    '伍', '陆', '柒', '捌', '玖'
  ]
  var unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ]
  var head = n < 0 ? '欠' : ''
  n = Math.abs(n)
  var s = ''
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
  }
  s = s || '整'
  n = Math.floor(n)
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    var p = ''
    for (var j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p
      n = Math.floor(n / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }
  return head + s.replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整')
}

export function timeToDate (time) {
  return moment(time.format('YYYY-MM-DD', 'YYYY-MM-DD'))
}
/**
 * 检验文本是否为手机号
 * @param {手机号} mp
 */
export function isMobile (mp) {
  return /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(mp)
}
// 校验 是否为正整数
export function isPositiveInt (value) {
  var reg = /^[1-9]\d*$/g
  return reg.test(value)
}
/**
 *  校验是否是正数
 * @param {输入速} typeCode
 */
export function isPositiveNum (value) {
  return /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)
  // return /^(\-|\+)?\d+(\.\d+)?$/.test(value)
}

export function getItemsBytypeCode (typeCode) {
  return request(appendDolphinApiPrefix('/v1/drop-down-list/type-code?typeCode=' + typeCode), {
    method: 'GET',
    data: {}
  })
}

/**
 * 获取当前用户信息（userId，userName，userType,PartnerId
 */
export function getAccuoutUserInfo () {
  return request(appendDolphinApiPrefix('v1/account/current'), {
    method: 'GET',
    data: {}
  })
}

/* data:文件流，filename：后台传来的编码过的文件名 */
export function exportExcel (data, filename) {
  var blob = new Blob([data], { type: 'application/vnd.ms-excel;charset=utf-8' })
  var downloadElement = document.createElement('a')
  var href = window.URL.createObjectURL(blob) // 创建下载的链接
  downloadElement.href = href
  downloadElement.download = decodeURI(filename) // 下载后文件名
  document.body.appendChild(downloadElement)
  downloadElement.click() // 点击下载
  document.body.removeChild(downloadElement) // 下载完成移除元素
  window.URL.revokeObjectURL(href) // 释放掉blob对象
}

export function formatDate (val) {
  return val ? moment(val, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD') : ''
}

export function formatDateTime (val) {
  return val ? moment(val, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') : ''
}
/**
 * 获取当前的用户是否内部用户,外部用户,是否内部核算等信息
 * @returns {*}
 */
export function getCurrentUserDealerInfo () {
  return request(appendApiPrefix('v1/md-dealer/getCurrentUserDealerInfo'), {
    method: 'GET',
    data: {}
  })
}

/**
 * 获取同步时间
 */

export function getSyncDataByType (masterDataType) {
  return request(appendApiPrefix('v1/mst-sync-log/getSyncDataByType?mstType=' + masterDataType), {
    method: 'GET',
    data: {}
  })
}
