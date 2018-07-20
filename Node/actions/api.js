const api = require('../lib/api')
const apiPlugin = require('../plugins/api')
const errors = require('../errors/common')

exports.add = async (req, res) => {
  const data = req.body
  const { apiName, description } = data
  await api
    .add(apiName, description)
    .then(doc => {
      doc = apiPlugin.generateAddApi(doc)
      res.json(doc)
    })
    .catch(err => {
      err = errors.dealExistData('api', err)
      errors.responseError(res, err)
    })
}

exports.get = async (req, res) => {
  console.log(1)
  await api
    .get()
    .then(doc => {
      res.json(doc)
    })
    .catch(() => {
      console.log(1)
    })
}
