const nodeconfig = require('../config/nodeconfig')
const errors = require('../errors/common')

// 处理加入Api
exports.dealAdd = obj => {
  const { apiName, createdAt, description } = obj

  return {
    apiName,
    createdAt,
    description
  }
}

// 处理加入Api出错
exports.dealAddError = err => {
  const errLater = {}
  if (err.message.indexOf('duplicate key error') > -1) {
    errLater.error_message = 'api已存在'
    errLater.error_code = nodeconfig.code.existData
    return errLater
  }
  if (err.errors) {
    return errors.dealValidatorData(err)
  }
}

// 处理获取Api
exports.dealGet = arr => {
  let laterArr = []
  // 重新构造时间
  for (const obj of arr) {
    const { apiName, createdAt, description } = obj
    let computedCreatedAt = ''
    const year = createdAt.getFullYear()
    const month = createdAt.getMonth() + 1
    const day = createdAt.getDate()
    const hour = createdAt.getHours()
    const minute = createdAt.getMinutes()
    const second = createdAt.getSeconds()
    computedCreatedAt = `${year}年${month}月${day}日${hour}点${minute}分${second}秒`
    laterArr.push({
      apiName,
      createdAt: computedCreatedAt,
      description
    })
  }
  return laterArr
}
