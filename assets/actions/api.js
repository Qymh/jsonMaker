import http from '../lib/http'
import * as api from '../lib/api'

export default {
  addApi(apiName, description) {
    return new Promise((resolve, reject) => {
      http
        .post(api.addApi, { apiName, description })
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  getApi() {
    console.log('123')
    return new Promise((resolve, reject) => {
      http
        .post(api.getApi, {})
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
