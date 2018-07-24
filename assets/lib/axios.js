import axios from 'axios'
import Vue from 'vue'
import { SERVERCONFIG, APPCONFIG } from './appconfig'

const isClient = process.client

const ax = axios.create({
  baseURL: SERVERCONFIG.domain,
  timeout: SERVERCONFIG.timeout
})

// 请求拦截
ax.interceptors.request.use(config => {
  if (process.env.TOKEN) {
    config.headers.common['authenticate'] = process.env.TOKEN
  }
  const { data } = config
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
  const { status, data } = response
  if (APPCONFIG.isDebug) {
    if (status >= 200 && status <= 300) {
      console.log('---response data ---')
      console.log(data)
      if (data.error_code && isClient) {
        let vm = new Vue()
        vm.$message({
          type: 'error',
          message: data.error_message,
          duration: 2000
        })
      }
    } else {
      console.log('--- error ---')
      console.log(data)
      if (isClient) {
        let vm = new Vue()
        vm.$message({
          type: 'error',
          message:
            status === 0 ? '网络链接异常' : `网络异常,错误代码:${status}`,
          duration: 2000
        })
      }
    }
  }
  return {
    data: response.data
  }
})

export default ax
