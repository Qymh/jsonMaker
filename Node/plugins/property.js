const CommonPlugins = require('./common')

// 处理添加属性
exports.dealAdd = obj => {
  const { id, name, type } = obj
  return {
    propertyId: id,
    name,
    type
  }
}

// 处理添加属性出错
exports.dealAddError = err => {
  return CommonPlugins.dealValidatorData(err)
}

// 处理获取属性
exports.dealGet = arr => {
  const laterArr = []
  for (const item of arr) {
    const { id, name, type } = item
    laterArr.push({
      propertyId: id,
      name,
      type
    })
  }
  return laterArr.reverse()
}
