const ApiModel = require('../schema/api')

/**
 * 
 * @param {String} apiName api名字
 * @param {String} description api描述
 */
exports.add = (apiName, description) => {
  return new Promise((resolve, reject) => {
    const Api = new ApiModel({
      apiName,
      description
    })

    Api.save((err, doc) => {
      if (err) reject({ error_code: err.code, error_message: err.message })
      resolve(doc)
    })
  })
}

exports.get = () => {
  return new Promise((resolve, reject) => {
    ApiModel.find('*').exec((err, doc) => {
      if (err) reject({ error_code: err.code, error_message: err.message })
      resolve(doc)
    })
  })
}
