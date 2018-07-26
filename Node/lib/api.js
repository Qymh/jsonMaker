const UserPlugins = require('../plugins/user')
const ApiPlugins = require('../plugins/api')
const CommonPlugins = require('../plugins/common')
const UserModel = require('../model/user')
const ApiModel = require('../model/api')

/**
 * 添加api
 * @param {String} apiName api名字
 * @param {String} description api描述
 * @param {String} token token值
 */
exports.add = (apiName, description, token) => {
  const id = UserPlugins.verifyToken(token).data
  return new Promise((resolve, reject) => {
    const Api = new ApiModel({
      apiName,
      description
    })

    Api.save((err, doc) => {
      if (err) {
        console.log(err)
        err = ApiPlugins.dealAddError(err)
        reject(err)
      } else {
        UserModel.find({ _id: id })
          .update({ $push: { api: doc } })
          .exec(err => {
            if (err) {
              err = CommonPlugins.dealError(err)
              reject(err)
            } else {
              doc = ApiPlugins.dealAdd(doc)
              resolve(doc)
            }
          })
      }
    })
  })
}

/**
 * 获取api
 * @param {String} token token值
 */
exports.get = token => {
  return new Promise((resolve, reject) => {
    const id = UserPlugins.verifyToken(token).data
    UserModel.find({ _id: id }).exec((err, doc) => {
      if (err) {
        err = CommonPlugins.dealError(err)
        reject(err)
      } else {
        doc = ApiPlugins.dealGet(doc[0].api)
        resolve(doc)
      }
    })
  })
}

/**
 * 删除api
 * @param {String} apiId apiId
 * @param {String} token token值
 */
exports.delete = (apiId, token) => {
  return new Promise((resolve, reject) => {
    const id = UserPlugins.verifyToken(token).data
    UserModel.find({ _id: id })
      .update({ $pull: { api: { id: apiId } } })
      .exec(err => {
        if (err) {
          err = CommonPlugins.dealError(err)
          reject(err)
        } else {
          resolve({ success: true })
        }
      })
  })
}
