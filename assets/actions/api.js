import http from '../lib/http'
import * as api from '../lib/api'

export default {
  /**
   * 添加api
   * @param {String} apiName api名字
   * @param {String} description api描述
   */
  addApi(apiName, description) {
    return new Promise((resolve, reject) => {
      http
        .post(api.addApi, { apiName, description }, true)
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  /**
   * 获取api
   */
  getApi() {
    return new Promise((resolve, reject) => {
      http
        .post(api.getApi, {})
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
