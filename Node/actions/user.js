const user = require('../lib/user')
const errors = require('../errors/common')

// 注册
exports.register = async (req, res) => {
  const data = req.body
  const { account, password, userName } = data
  await user
    .register(account, password, userName)
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.json(err)
    })
}

// 登陆
exports.login = async (req, res) => {
  const data = req.body
  const { account, password } = data
  await user
    .login(account, password)
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.json(err)
    })
}
