import http from '../lib/http'
import * as api from '../lib/api'

export default {
  register(vm, account, password) {
    return new Promise((resolve, reject) => {
      http
        .post(vm, api.register, { account, password })
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
