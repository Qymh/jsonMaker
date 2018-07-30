import http from '../lib/http'
import * as api from '../lib/api'

export default {
  /**
   * 添加属性
   * @param {String} apiId api唯一Id
   * @param {String} name 属性名
   * @param {String} type 属性类型
   */
  addProperty(apiId, name, type) {
    return new Promise((resolve, reject) => {
      http
        .post(api.addProperty, { apiId, name, type }, true)
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
