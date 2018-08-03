const UserPlugins = require('../plugins/user')
const PropertyPlugins = require('../plugins/property')
const CommonPlugins = require('../plugins/common')
const UserModel = require('../model/user')
const PropertyModel = require('../model/property')
const nodeconfig = require('../config/nodeconfig')

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
              for (let item of match[0].properties) {
                if (item.name == name) {
                  const errLater = {}
                  errLater.error_message = '属性名已经存在'
                  errLater.error_code = nodeconfig.code.existData
                  reject(errLater)
                  return
                }
              }
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
          doc = PropertyPlugins.dealGet(match[0].properties.reverse())
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
        let outerIndex = ''
        const match = doc[0].api.filter((p, index) => {
          outerIndex = index
          // 这个位置用 === 无法匹配
          return p._id == apiId
        })
        if (match.length !== 1) {
          let err = Object.create(null)
          err.message = 'apiId不存在'
          err = CommonPlugins.dealError(err)
          reject(err)
        } else {
          let propertyName = ''
          // 这个位置用 === 无法匹配
          doc[0].api[outerIndex].properties = doc[0].api[
            outerIndex
          ].properties.filter(p => {
            if (p.id == propertyId) {
              propertyName = p.name
            }
            return p._id != propertyId
          })
          doc[0].api[outerIndex].collections.forEach(p => {
            delete p[propertyName]
          })
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

// 修改属性
exports.put = (apiId, propertyId, value, token) => {
  return new Promise((resolve, reject) => {
    const id = UserPlugins.verifyToken(token).data
    UserModel.find({ _id: id }).exec((err, doc) => {
      if (err) {
        err = CommonPlugins.dealError(err)
        reject(err)
      } else {
        let outerIndex = ''
        const match = doc[0].api.filter((p, index) => {
          outerIndex = index
          // 这个位置用 === 无法匹配
          return p._id == apiId
        })
        if (match.length !== 1) {
          let err = Object.create(null)
          err.message = 'apiId不存在'
          err = CommonPlugins.dealError(err)
          reject(err)
        } else {
          for (let item of match[0].properties) {
            if (item.name == value) {
              const errLater = {}
              errLater.error_message = '属性名已经存在'
              errLater.error_code = nodeconfig.code.existData
              reject(errLater)
              return
            }
          }
          let ago = ''
          // 修改属性
          doc[0].api[outerIndex].properties.forEach(p => {
            if (p._id == propertyId) {
              ago = p.name
              p.name = value
            }
          })
          // 修改集合
          doc[0].api[outerIndex].collections.forEach(p => {
            let later = p[ago]
            const outerArr = Object.keys(p)
            const index = outerArr.findIndex(same => {
              return same == ago
            })
            delete p[ago]
            const arr = Object.keys(p)
            const valueArr = []
            for (let i = 0; i < arr.length; i++) {
              const item = arr[i]
              valueArr.push(p[item])
              delete p[item]
            }
            for (let i = 0; i < arr.length; i++) {
              const item = arr[i]
              if (i === index) {
                p[value] = later
              }
              p[item] = valueArr[i]
            }
          })
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
