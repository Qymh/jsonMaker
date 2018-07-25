const UserPlugins = require('../plugins/user')
const ApiPlugins = require('../plugins/api')
const CommonPlugins = require('../plugins/common')
const UserModel = require('../schema/user')

/**
 * 添加api
 * @param {String} apiName api名字
 * @param {String} description api描述
 * @param {String} token token值
 */
exports.add = (apiName, description, token) => {
  const id = UserPlugins.verifyToken(token).data
  UserModel.find({ _id: id }).exec((err, doc) => {
  })
  return new Promise((resolve, reject) => {
    // const Api = new ApiModel({
    //   apiName,
    //   description,
    //   userId: id
    // })
    // Api.save((err, doc) => {
    //   if (err) {
    //     err = ApiPlugins.dealAddError(err)
    //     reject(err)
    //   } else {
    //     doc = ApiPlugins.dealAdd(doc)
    //     resolve(doc)
    //   }
    // })
  })
}

/**
 * 获取api
 * @param {String} token token值
 */
exports.get = token => {
  return new Promise((resolve, reject) => {
    const id = UserPlugins.verifyToken(token).data
    UserModel.find({ _id: id, api: { apiName: /\w*/g } })
      .sort({ createdAt: 'desc' })
      .exec((err, doc) => {
        if (err) {
          err = CommonPlugins.dealError(err)
          reject(err)
        } else {
          doc = ApiPlugins.dealGet(doc)
          resolve(doc)
        }
      })
  })
}
