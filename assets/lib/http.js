import ax from './axios'
import Vue from 'vue'

export default {
  /**
   * post公用函数
   * @param {String} api api接口
   * @param {Object} data 数据
   * @param {Boolean} isLoading 是否需要加载
   */
  post(api, data, isLoading = false) {
    return new Promise((resolve, reject) => {
      let vm = ''
      let loading = ''
      if (isLoading) {
        vm = new Vue()
        loading = vm.$loading()
      }
      ax({
        method: 'Post',
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
  }
}
