import ax from './axios'
import Vue from 'vue'

export default {
  post(api, data) {
    return new Promise((resolve, reject) => {
      const vm = new Vue()
      const loading = vm.$loading()
      ax({
        method: 'Post',
        url: api,
        data
      }).then(res => {
        let { data } = res
        if (data.error_code) {
          loading.close()
          reject(data)
        } else {
          loading.close()
          resolve(data)
        }
      })
    })
  }
}
