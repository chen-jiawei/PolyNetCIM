import Vue from 'vue'
import router from './router'
import helper from './helper'
const BASE_URL = process.env.BASE_API
const CREDS = 'include'
function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) { return response }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}
const asyncFetch = async function (obj) {
  const url = obj.url ? BASE_URL + obj.url : BASE_URL + obj
  const method = obj.method || 'GET'
  const credentials = obj.credentials || CREDS
  const mode = obj.mode || 'cors'
  const body = obj.body || null
  const headers = {
    'Content-Type': 'application/json'
  }
  let confFetch = { method, credentials }
  if (method === 'POST') { confFetch = { method, mode, headers, credentials, body: JSON.stringify(body) } }
  return new Promise(function (resolve, reject) {
    fetch(url, confFetch)
      .then(checkStatus)
      .then(res => res.json())
      .then(res => {
        /**
         * 统一处理接口信息
         */
        if (res.responseCode && res.responseCode === 1250) {
          // 登录超时
          helper.ls.set('historyName', headers.ls.get('PolyName'))
          router.push('/login/timeout')
        }
        resolve(res)
      })
      .catch(err => { reject(err) })
  })
}
Vue.prototype.$fetch = asyncFetch
// export default asyncFetch
