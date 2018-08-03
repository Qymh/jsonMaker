const collections = require('../lib/collections')

// 添加集合
exports.add = async (req, res) => {
  const data = req.body
  const { apiId, propertiesArr } = data
  const token = res.locals.token
  await collections
    .add(apiId, propertiesArr, token)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
}

// 获取集合
exports.get = async (req, res) => {
  const data = req.body
  const { apiId } = data
  const token = res.locals.token
  await collections
    .get(apiId, token)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
}

// 删除集合
exports.delete = async (req, res) => {
  const data = req.body
  const { apiId, collectionsId } = data
  const token = res.locals.token
  await collections
    .delete(apiId, collectionsId, token)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
}

// 删除集合
exports.put = async (req, res) => {
  const data = req.body
  const { apiId, collectionsObj, index } = data
  const token = res.locals.token
  await collections
    .put(apiId, collectionsObj, index, token)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
}
