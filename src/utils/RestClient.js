// import 'babel-polyfill';
import axios from 'axios'

const API_PREFIX = '/raccoon/api'
const DOLPHIN_PREFIX = '/dolphin/api'

/**
 * 处理输入选项
 * @param {*} options
 */
function pureOptions (options) {
  const opt = options ? { ...options } : {}
  opt.method = opt.method || 'GET'
  opt.headers = opt.headers || {}

  const newOptions = { ...opt }
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    if (!(newOptions.data instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers
      }
      newOptions.data = JSON.stringify(newOptions.data)
    } else {
      // newOptions.data is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers
      }
    }
  }
  return opt
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 */
function request (url, options) {
  const newOptions = pureOptions(options)
  const promise = new Promise(function (resolve, reject) {
    axios({
      url: url,
      method: newOptions.method,
      data: newOptions.data,
      headers: newOptions.headers
    })
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error)
      })
  })

  return promise
}
// 导出请求
function exportRequest (url, options) {
  const newOptions = pureOptions(options)
  const promise = new Promise(function (resolve, reject) {
    axios({
      url: url,
      method: newOptions.method,
      data: newOptions.data,
      responseType: newOptions.responseType,
      headers: newOptions.headers
    })
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })

  return promise
}
// 单个文件 导入
// eslint-disable-next-line no-unused-vars
function importRequest (url, options) {
  const newOptions = pureOptions(options)
  const promise = new Promise(function (resolve, reject) {
    axios({
      url: url,
      method: newOptions.method,
      data: newOptions.data,
      processData: false
    })
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })

  return promise
}

/**
 * 对api url追加前缀
 * @param {*} apiUrl
 */
function appendApiPrefix (apiUrl) {
  if (!apiUrl.startsWith('/')) {
    apiUrl = '/' + apiUrl
  }
  return API_PREFIX + apiUrl
}

/**
 * 发送请求时, 带上默认 api 前缀(/raccoon/api)
 * @param {*} url
 * @param {*} options
 */
function requestWithPrefix (url, options) {
  return request(appendApiPrefix(url), options)
}

// 此处不能使用 await, 因为需要 babel-polyfill 支持, 但需要在每一个页面的头部载入 polyfill.
// 不能保证每一个页面的头部有 polyfill, 所以去掉此函数
// /**
//  * Requests a URL, use await async
//  * @param {string} url
//  * @param {object} options
//  */
// async function requestAwait(url, options) {
//     return await request(url, options);
// }
/**
 * 对dolphin api url追加前缀
 * @param apiUrl
 * @returns {string}
 */
function appendDolphinApiPrefix (apiUrl) {
  if (!apiUrl.startsWith('/')) {
    apiUrl = '/' + apiUrl
  }
  return DOLPHIN_PREFIX + apiUrl
}

export { request, exportRequest, appendApiPrefix, requestWithPrefix, appendDolphinApiPrefix }
