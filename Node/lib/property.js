const UserPlugins = require('../plugins/user')
const PropertyPlugins = require('../plugins/property')
const CommonPlugins = require('../plugins/common')
const UserModel = require('../model/user')
const PropertyModel = require('../model/property')

/**
 * 添加属性
 * @param {String} apiId 当前添加的apiId
 * @param {String} name 属性名
 * @param {String} token token值
 */
exports.add = (apiId, name, token) => {
  return new Promise((resolve, reject) => {
    const id = UserPlugins.verifyToken(token).data
    const Property = new PropertyModel({
      name
    })
    Property.save((err, prop) => {
      if (err) {
        err = PropertyPlugins.dealAddError(err)
        reject(err)
      } else {
        UserModel.find({ _id: id }).exec((err, doc) => {
          if (err) {
            err = CommonPlugins.dealError(err)
            reject(err)
          } else {
            // 这个位置用 === 无法匹配
            const match = doc[0].api.filter(p => p._id == apiId)
            if (match.length !== 1) {
              err.message = 'apiId不存在'
              err = CommonPlugins.dealError(err)
              reject(err)
            } else {
              match[0].properties.push({
                name
              })
              UserModel.findByIdAndUpdate(id, doc[0]).exec(err => {
                if (err) {
                  err = CommonPlugins.dealError(err)
                  reject(err)
                } else {
                  prop = PropertyPlugins.dealAdd(prop)
                  resolve(prop)
                }
              })
            }
          }
        })
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
        // 这个位置用 === 无法匹配
        const match = doc[0].api.filter(p => p._id == apiId)
        if (match.length !== 1) {
          let err = Object.create(null)
          err.message = 'apiId不存在'
          err = CommonPlugins.dealError(err)
          reject(err)
        } else {
          doc = PropertyPlugins.dealGet(match[0].properties)
          resolve(doc)
        }
      }
    })
  })
}

// 删除属性
exports.delete = (apiId, propertyId, token) => {
  return new Promise((resolve, reject) => {
    const id = UserPlugins.verifyToken(token).data
    UserModel.find({ _id: id }).exec((err, doc) => {
      if (err) {
        err = CommonPlugins.dealError(err)
        reject(err)
      } else {
        // 这个位置用 === 无法匹配
        let outerIndex = ''
        const match = doc[0].api.filter((p, index) => {
          outerIndex = index
          return p._id == apiId
        })
        if (match.length !== 1) {
          let err = Object.create(null)
          err.message = 'apiId不存在'
          err = CommonPlugins.dealError(err)
          reject(err)
        } else {
          doc[0].api[outerIndex].properties = doc[0].api[
            outerIndex
          ].properties.filter(p => p._id != propertyId)
          UserModel.findByIdAndUpdate(id, doc[0]).exec(err => {
            if (err) {
              err = CommonPlugins.dealError(err)
              reject(err)
            } else {
              resolve({ success: true })
            }
          })
        }
      }
    })
  })
}
