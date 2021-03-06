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
  getApi(userName) {
    return new Promise((resolve, reject) => {
      http
        .post(api.getApi, { userName })
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  /**
   * 删除api
   * @param {String} apiId apiId
   */
  deleteApi(apiId) {
    return new Promise((resolve, reject) => {
      http
        .delete(api.deleteApi, { apiId })
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  /**
   * 修改api
   * @param {String} apiId apiId
   * @param {String} apiName api名字
   * @param {String} description api描述
   */
  putApi(apiId, apiName, description) {
    return new Promise((resolve, reject) => {
      http
        .put(api.putApi, { apiId, apiName, description })
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
