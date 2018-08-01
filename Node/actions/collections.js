const collections = require('../lib/collections')

// 添加集合
exports.add = async (req, res) => {
  const data = req.body
  const token = res.locals.token
  const { apiId, propertiesArr } = data
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
  const token = res.locals.token
  const { apiId } = data
  await collections
    .get(apiId, token)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
}
