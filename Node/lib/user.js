const UserModel = require('../schema/user')
const UserPlugin = require('../plugins/user')

/**
 * 注册
 * @param {String | Number} account 帐号
 * @param {String | Number} password 密码
 * @param {String | Number} userName 名字
 */
exports.register = (account, password, userName) => {
  return new Promise((resolve, reject) => {
    const User = new UserModel({
      account,
      password,
      userName
    })

    User.save((err, doc) => {
      if (err) {
        err = UserPlugin.dealRegisterError(err)
        reject(err)
      }
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
      err = UserPlugin.dealLoginError(user, password)
      if (err.error_code) {
        reject(err)
      } else {
        user = UserPlugin.dealLogin(user)
        resolve(user)
      }
    })
  })
}
