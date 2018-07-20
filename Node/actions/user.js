const user = require('../lib/user')
const errors = require('../errors/common')

// 注册
exports.register = async (req, res) => {
  const data = req.body
  const { account, password } = data
  await user
    .register(account, password)
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      err = errors.dealExistData('帐号', err)
      errors.responseError(res, err)
    })
}

// 登陆
exports.login = async (req, res) => {
  const data = req.body
  const { account, password } = data
  await user
    .login(account, password)
    .then(doc => {
      const { account, name, token } = doc
      res.json({ account, name, token })
    })
    .catch(err => {
      errors.responseError(res, err)
    })
}
