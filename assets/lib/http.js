import ax from './axios'

export default {
  post(vm, api, data) {
    return new Promise((resolve, reject) => {
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
