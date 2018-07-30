const nodeconfig = require('../config/nodeconfig')
const CommonPlugins = require('./common')

// 处理添加属性
exports.dealAdd = obj => {
  const { id, name, type } = obj
  return {
    id,
    name,
    type
  }
}

// 处理添加属性出错
exports.dealAddError = err => {
  return CommonPlugins.dealValidatorData(err)
}
