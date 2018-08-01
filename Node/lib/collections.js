const UserPlugins = require('../plugins/user')
const CollectionsPlugins = require('../plugins/collections')
const CommonPlugins = require('../plugins/common')
const CollectionsModel = require('../model/collections')
const UserModel = require('../model/user')

// 添加集合
exports.add = (apiId, propertiesArr, token) => {
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
          err.message = 'apiId不存在'
          err = CommonPlugins.dealError(err)
          reject(err)
        } else {
          // 从属性数组中获取要添加的集合对象
          const collectionsObj = CollectionsPlugins.dealPropertiesArr(
            propertiesArr
          )
          // 从集合对象中获取要添加的集合Schema
          const collectionsSchema = CollectionsPlugins.dealCollectionsSchema(
            collectionsObj
          )
          // 添加Schema到Model中
          CollectionsModel.schema.add(collectionsSchema)
          const collections = new CollectionsModel(collectionsObj)
          collections.save((err, col) => {
            if (err) {
              err = CommonPlugins.dealError(err)
              reject(err)
            } else {
              col = CollectionsPlugins.dealAdd(col, collectionsObj)
              match[0].collections.push(col)
              UserModel.findByIdAndUpdate(id, doc[0]).exec(err => {
                if (err) {
                  err = CommonPlugins.dealError(err)
                  reject(err)
                } else {
                  resolve(doc)
                }
              })
            }
          })
        }
      }
    })
  })
}

// 获取集合
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
          err.message = 'apiId不存在'
          err = CommonPlugins.dealError(err)
          reject(err)
        } else {
          const tableArr = CollectionsPlugins.dealGet(match[0].collections)
          resolve({
            collections: match[0].collections.reverse(),
            tableArr
          })
        }
      }
    })
  })
}
