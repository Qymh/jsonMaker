import ax from './axios'
import Vue from 'vue'

export default {
  /**
   * ajax公用函数
   * @param {String} api api接口
   * @param {Object} data 数据
   * @param {Boolean} isLoading 是否需要加载
   */
  ajax(method, api, data, isLoading = false) {
    return new Promise((resolve, reject) => {
      let vm = ''
      let loading = ''
      if (isLoading) {
        vm = new Vue()
        loading = vm.$loading()
      }
      ax({
        method,
        url: api,
        data
      }).then(res => {
        let { data } = res
        if (data.error_code) {
          isLoading && loading.close()
          reject(data)
        } else {
          isLoading && loading.close()
          resolve(data)
        }
      })
    })
  },

  /**
   * post函数
   * @param {String} api api接口
   * @param {Object} data 数据
   * @param {Boolean} isLoading 是否需要加载
   */
  post(api, data, isLoading = false) {
    return new Promise((resolve, reject) => {
      this.ajax('POST', api, data, isLoading)
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  /**
   * delete函数
   * @param {String} api api接口
   * @param {Object} data 数据
   * @param {Boolean} isLoading 是否需要加载
   */
  delete(api, data, isLoading = false) {
    return new Promise((resolve, reject) => {
      this.ajax('DELETE', api, data, isLoading)
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  /**
   * put函数
   * @param {String} api api接口
   * @param {Object} data 数据
   * @param {Boolean} isLoading 是否需要加载
   */
  put(api, data, isLoading = false) {
    return new Promise((resolve, reject) => {
      this.ajax('PUT', api, data, isLoading)
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
