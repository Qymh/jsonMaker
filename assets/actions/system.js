import http from '../lib/http'
import * as api from '../lib/api'

export default {
  /**
   * 获取全局属性
   * @param {String} token token值
   */
  getSystem(token) {
    return new Promise((resolve, reject) => {
      http
        .post(api.system, { token })
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
