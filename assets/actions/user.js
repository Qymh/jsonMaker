import http from '../lib/http'
import * as api from '../lib/api'

export default {
  /**
   * 注册
   * @param {String|Number} account 帐号
   * @param {String|Number}} password 密码
   * @param {String|Number}} userName 用户名
   */
  register(account, password, userName) {
    return new Promise((resolve, reject) => {
      http
        .post(api.register, { account, password, userName })
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  /**
   * 登录
   * @param {String|Number} account 帐号
   * @param {String|Number}} password 密码
   */
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
