import http from '../lib/http'
import * as api from '../lib/api'

export default {
  /**
   * 添加集合
   * @param {String} apiId apiId
   * @param {Array} propertiesArr 属性数组
   */
  addCollections(apiId, propertiesArr) {
    return new Promise((resolve, reject) => {
      http
        .post(api.addCollections, { apiId, propertiesArr }, true)
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  /**
   * 获取集合
   * @param {String} apiId apiId
   */
  getCollections(apiId) {
    return new Promise((resolve, reject) => {
      http
        .post(api.getCollections, { apiId })
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
