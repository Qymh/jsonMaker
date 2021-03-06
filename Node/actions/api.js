const api = require('../lib/api')

// 添加
exports.add = async (req, res) => {
  const data = req.body
  const { apiName, description } = data
  const token = res.locals.token
  await api
    .add(apiName, description, token)
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.json(err)
    })
}

// 获取
exports.get = async (req, res) => {
  const data = req.body
  const { userName } = data
  const token = res.locals.token
  await api
    .get(userName, token)
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.json(err)
    })
}

// 删除
exports.delete = async (req, res) => {
  const data = req.body
  const { apiId } = data
  const token = res.locals.token
  await api
    .delete(apiId, token)
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.json(err)
    })
}

// 修改
exports.put = async (req, res) => {
  const data = req.body
  const { apiId, apiName, description } = data
  const token = res.locals.token
  await api
    .put(apiId, apiName, description, token)
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.json(err)
    })
}
