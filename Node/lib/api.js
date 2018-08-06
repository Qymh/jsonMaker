const UserPlugins = require('../plugins/user')
const ApiPlugins = require('../plugins/api')
const CommonPlugins = require('../plugins/common')
const UserModel = require('../model/user')
const ApiModel = require('../model/api')
const nodeconfig = require('../config/nodeconfig')

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

    UserModel.find({ _id: id }).exec((err, doc) => {
      if (err) {
        err = CommonPlugins.dealError(err)
        reject(err)
      } else {
        for (let item of doc[0].api) {
          if (item.apiName == apiName) {
            const laterErr = {}
            laterErr.error_code = nodeconfig.code.existData
            laterErr.error_message = 'api已经存在'
            reject(laterErr)
            return
          }
        }
        Api.save((err, doc) => {
          if (err) {
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
      }
    })
  })
}

/**
 * 获取api
 * @param {String} token token值
 */
exports.get = (userName, token) => {
  return new Promise((resolve, reject) => {
    const id = UserPlugins.verifyToken(token).data
    UserModel.find({ _id: id }).exec((err, doc) => {
      if (doc[0].userName !== userName) {
        const laterErr = {}
        laterErr.error_code = nodeconfig.code.noUser
        laterErr.error_message = '用户不存在'
        reject(laterErr)
        return
      }
      if (err) {
        err = CommonPlugins.dealError(err)
        reject(err)
      } else {
        try {
          doc = ApiPlugins.dealGet(doc[0].api.reverse())
          resolve(doc)
        } catch (err) {
          const error = CommonPlugins.dealError({})
          reject(error)
        }
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
    ApiModel.findByIdAndRemove(apiId).exec(err => {
      if (err) {
        err = CommonPlugins.dealError(err)
        reject(err)
      } else {
        UserModel.find({ _id: id }).exec((err, doc) => {
          if (err) {
            err = CommonPlugins.dealError(err)
            reject(err)
          } else {
            const arr = doc[0].api.filter(p => {
              return p._id != apiId
            })
            UserModel.find({ _id: id })
              .update({ $set: { api: arr } })
              .exec(err => {
                if (err) {
                  err = CommonPlugins.dealError(err)
                } else {
                  resolve({ success: true })
                }
              })
          }
        })
      }
    })
  })
}

/**
 * 修改api
 * @param {String} apiId apiId
 * @param {String} apiName api名字
 * @param {String} description api描述
 * @param {String} token token值
 */
exports.put = (apiId, apiName, description, token) => {
  return new Promise((resolve, reject) => {
    const id = UserPlugins.verifyToken(token).data
    ApiModel.findByIdAndUpdate(
      apiId,
      { apiName, description },
      { new: true }
    ).exec((err, newApi) => {
      if (err) {
        err = CommonPlugins.dealError(err)
        reject(err)
      } else {
        UserModel.find({ _id: id }).exec((err, doc) => {
          if (err) {
            err = CommonPlugins.dealError(err)
            reject(err)
          } else {
            let outerIndex = ''
            const arr = doc[0].api.filter((p, index) => {
              if (p._id == apiId) {
                outerIndex = index
              }
              return p._id == apiId
            })
            if (!arr.length) {
              const errLater = {}
              errLater.error_code = nodeconfig.code.unknown
              errLater.error_message = 'api不存在'
              reject(errLater)
            } else {
              doc[0].api[outerIndex] = newApi
              UserModel.findByIdAndUpdate(id, doc[0]).exec(err => {
                if (err) {
                  err = CommonPlugins.dealError(err)
                } else {
                  resolve({ success: true })
                }
              })
            }
          }
        })
      }
    })
  })
}
