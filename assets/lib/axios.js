import axios from 'axios'
import Vue from 'vue'
import { SERVERCONFIG, APPCONFIG } from './appconfig'

const ax = axios.create({
  baseURL: SERVERCONFIG.domain,
  timeout: SERVERCONFIG.timeout
})

// 请求拦截
ax.interceptors.request.use(config => {
  let { data } = config
  if (APPCONFIG.isDebug) {
    console.log(`serverApi:${config.baseURL}${config.url}`)
    if (Object.keys(data).length > 0) {
      console.log(`request data ${JSON.stringify(data)}`)
    }
  }
  return config
})

// 响应拦截
ax.interceptors.response.use(response => {
  let { status, data } = response
  if (APPCONFIG.isDebug) {
    if (status >= 200 && status <= 300) {
      console.log('---response data ---')
      console.log(data)
    } else {
      console.log('--- error ---')
      console.log(data)
      let vm = new Vue()
      vm.$message({
        type: 'error',
        message: status === 0 ? '网络链接异常' : `网络异常,错误代码:${status}`,
        duration: 2000
      })
    }
  }
})

export default ax
