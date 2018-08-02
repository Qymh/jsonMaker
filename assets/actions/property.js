import http from '../lib/http'
import * as api from '../lib/api'

export default {
  /**
   * 添加属性
   * @param {String} apiId api唯一Id
   * @param {String} name 属性名
   */
  addProperty(apiId, name) {
    return new Promise((resolve, reject) => {
      http
        .post(api.addProperty, { apiId, name }, true)
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  /**
   * 获取属性值
   * @param {String} apiId api唯一Id
   */
  getProperties(apiId) {
    return new Promise((resolve, reject) => {
      http
        .post(api.getProperties, { apiId })
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  /**
   * 删除属性值
   * @param {String} apiId api唯一Id
   * @param {String} propertyId 属性唯一Id
   */
  deleteProperty(apiId, propertyId) {
    return new Promise((resolve, reject) => {
      http
        .delete(api.deleteProperty, { apiId, propertyId }, true)
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  /**
   * 修改属性值
   * @param {String} apiId api唯一Id
   * @param {String} propertyId 属性唯一Id
   * @param {String} value 修改后的值
   */
  putProperty(apiId, propertyId, value) {
    return new Promise((resolve, reject) => {
      http
        .put(api.putProperty, { apiId, propertyId, value }, true)
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
