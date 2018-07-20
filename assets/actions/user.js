import http from '../lib/http'
import * as api from '../lib/api'

export default {
  register(account, password) {
    return new Promise((resolve, reject) => {
      http
        .post(api.register, { account, password })
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  login(account, password) {
    return new Promise((resolve, reject) => {
      http
        .post(api.login, { account, password })
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
