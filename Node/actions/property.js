const property = require('../lib/property')

// 添加属性
exports.add = async (req, res) => {
  const data = req.body
  const { name, apiId } = data
  const token = res.locals.token
  await property
    .add(apiId, name, token)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
}

// 获取属性
exports.get = async (req, res) => {
  const data = req.body
  const { apiId } = data
  const token = res.locals.token
  await property
    .get(apiId, token)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
}

// 删除属性
exports.delete = async (req, res) => {
  const data = req.body
  const { apiId, propertyId } = data
  const token = res.locals.token
  await property
    .delete(apiId, propertyId, token)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
}
