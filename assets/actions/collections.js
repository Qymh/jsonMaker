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
  },

  /**
   * 删除集合
   * @param {String} apiId apiId
   * @param {String} collectionsId 集合Id
   */
  deleteCollections(apiId, collectionsId) {
    return new Promise((resolve, reject) => {
      http
        .delete(api.deleteCollections, { apiId, collectionsId })
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  /**
   * 修改集合
   * @param {String} apiId apiId
   * @param {Object} collectionsObj 修改的集合对象
   * @param {Number} index 当前集合索引
   */
  putCollections(apiId, collectionsObj, index) {
    return new Promise((resolve, reject) => {
      http
        .put(api.putCollections, { apiId, collectionsObj, index })
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
