const UserModel = require('../schema/user')
const UserPlugins = require('../plugins/user')
const SystemPlugins = require('../plugins/system')

/**
 * 获取全局属性
 * @param {String} token token值
 */
exports.get = token => {
  return new Promise((resolve, reject) => {
    const id = UserPlugins.verifyToken(token).data
    UserModel.findById(id).exec((err, doc) => {
      if (err) {
        err = SystemPlugins.dealSystemErrors(err)
        reject(err)
      }
      doc = SystemPlugins.dealSystem(doc)
      resolve(doc)
    })
  })
}
