const UserPlugins = require('../plugins/user')
const PropertyPlugins = require('../plugins/property')
const CommonPlugins = require('../plugins/common')
const UserModel = require('../model/user')
const ApiModel = require('../model/api')
const PropertyModel = require('../model/property')

/**
 * 添加属性
 * @param {String} apiId 当前添加的apiId
 * @param {String} name 属性名
 * @param {String} type 属性类型
 * @param {String} token token值
 */
exports.add = (apiId, name, type, token) => {
  const id = UserPlugins.verifyToken(token).data
  return new Promise((resolve, reject) => {
    const Property = new PropertyModel({
      name,
      type
    })
    Property.save((err, doc) => {
      if (err) {
        err = PropertyPlugins.dealAddError(err)
        reject(err)
      } else {
        // ApiModel.find({ _id: apiId }).exec((err, doc) => {
        //   if (err) {
        //     err = CommonPlugins.dealError(err)
        //     reject(err)
        //   } else {
        //     // console.log(doc)
        //     resolve(1)
        //   }
        // })
        UserModel.find({ _id: id })
          .find({ api: apiId })
          .exec((err, doc) => {
            console.log(doc)
          })
        resolve(1)
        // UserModel.find({ _id: id })
        //   .update({ $push: { 'api.properties': doc } })
        //   .exec(err => {
        //     if (err) {
        //       err = CommonPlugins.dealError(err)
        //       reject(err)
        //     } else {
        //       doc = PropertyPlugins.dealAdd(doc)
        //       resolve(doc)
        //     }
        //   })
      }
    })
  })
}

// 获取属性
exports.get = (apiId, token) => {
  return new Promise((resolve, reject) => {
    const id = UserPlugins.verifyToken(token).data
    UserModel.find({ _id: id }).exec((err, doc) => {
      if (err) {
        err = CommonPlugins.dealError(err)
        reject(err)
      } else {
        try {
          console.log(doc[0].api)
          // doc = PropertyPlugins.dealGet(doc[0].api.reverse())
          resolve(1)
        } catch (err) {
          const error = CommonPlugins.dealError({})
          reject(error)
        }
      }
    })
  })
}
