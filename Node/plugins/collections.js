const Schema = require('mongoose').Schema

// 处理属性数组
exports.dealPropertiesArr = arr => {
  const obj = {}
  for (const item of arr) {
    const { name, value } = item
    obj[name] = value
  }
  return obj
}

// 处理collectionsSchema
exports.dealCollectionsSchema = obj => {
  const laterObj = {}
  for (const item of Object.keys(obj)) {
    laterObj[item] = Schema.Types.Mixed
  }
  return laterObj
}

// 处理添加
exports.dealAdd = (doc, obj) => {
  const arr = Object.keys(obj)
  const laterObj = {}
  for (const item of arr) {
    laterObj[item] = obj[item]
  }
  const { _id, createdAt } = doc

  let computedCreatedAt = ''
  const year = createdAt.getFullYear()
  const month = createdAt.getMonth() + 1
  const day = createdAt.getDate()
  const hour = createdAt.getHours()
  const minute = createdAt.getMinutes()
  const second = createdAt.getSeconds()
  computedCreatedAt = `${year}年${month}月${day}日${hour}点${minute}分${second}秒`

  laterObj.collectionsId = _id
  laterObj.createdAt = computedCreatedAt

  return laterObj
}

// 处理获取
exports.dealGet = arr => {
  let tableArr = []
  let len = 0
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    const keysArr = Object.keys(item)
    if (keysArr.length > len) {
      len = keysArr.length
      tableArr = keysArr
    }
  }
  if (tableArr.length) {
    const baseArr = new Set(['collectionsId', 'createdAt'])
    tableArr = tableArr.filter(p => !baseArr.has(p))
    tableArr = ['collectionsId'].concat(...tableArr).concat('createdAt')
  }
  return tableArr
}
