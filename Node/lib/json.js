const UserModel = require('../model/user')
const CommonPlugins = require('../plugins/common')
const nodeconfig = require('../config/nodeconfig')

// 获取json
exports.get = url => {
  return new Promise((resolve, reject) => {
    const regExp = /\/[A-Za-z]+/g
    const urlArr = url.match(regExp)
    const userName = urlArr[0].slice(1)
    const apiName = urlArr[1].slice(1)
    UserModel.find({ userName }).exec((err, doc) => {
      if (err) {
        err = CommonPlugins.dealError(err)
        reject(err)
      } else {
        const laterErr = {}
        if (!doc.length) {
          laterErr.error_code = nodeconfig.code.unknown
          laterErr.error_message = '不存在此api接口'
          reject(laterErr)
        } else {
          const arr = doc[0].api.filter(p => p.name != apiName)
          if (!arr.length) {
            laterErr.error_code = nodeconfig.code.unknown
            laterErr.error_message = '不存在此api接口'
            reject(laterErr)
          } else {
            resolve(arr[0].collections.reverse())
          }
        }
      }
    })
  })
}
