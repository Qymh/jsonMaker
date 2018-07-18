const UserModel = require('../schema/user')
const UserPlugin = require('../plugins/user')

/**
 * 注册
 * @param {String | Number} account 帐号
 * @param {String | Number} password 密码
 */
exports.register = (account, password) => {
  return new Promise((resolve, reject) => {
    const User = new UserModel({
      account,
      password
    })

    User.save((err, doc) => {
      if (err) reject({ error_code: err.code, error_message: err.message })
      resolve(doc)
    })
  })
}

/**
 * 登陆
 * @param {String | Number} account 帐号
 * @param {String | Number} password 密码
 */
exports.login = (account, password) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ account }).exec((err, user) => {
      if (err) reject(err)
      const error = UserPlugin.dealLogin(user, password)
      if (error.error_code) {
        reject(error)
      } else {
        user.token = UserPlugin.generateToken(user)
        resolve(user)
      }
    })
  })
}
