import axios from 'axios';


export function copyReqObj(reqObj) {
  const resultObj = {};
  for (const key in reqObj) {
    const value = reqObj[key];
    if (Object.prototype.toString.call(value) === '[object String]') {
      if (value.trim() !== '') {
        resultObj[key] = value;
      }
    } else {
      resultObj[key] = value;
    }
  }
  return resultObj;
}

/**
   * Requests a URL, returning a promise.
   *
   * @param  {string} url       The URL we want to request
   * @param  {object} [options] The options we want to pass to "fetch"
   */
function request(url, options) {
  const newOptions = pureOptions(options);

  const promise = new Promise(((resolve, reject) => {
    axios({
      url,
      method: newOptions.method,
      data: newOptions.data,
      headers: newOptions.headers,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  }));

  return promise;
}

function pureOptions(options) {
  const opt = options ? { ...options } : {};
  opt.method = opt.method || 'GET';
  opt.headers = opt.headers || {};

  const newOptions = { ...opt };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }
  return opt;
}
