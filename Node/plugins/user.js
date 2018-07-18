const jwt = require('jsonwebtoken')
const nodeconfig = require('../config/nodeconfig')

exports.dealLogin = (user, passwordNow) => {
  const err = {}
  if (user === null) {
    err.error_message = '用户不存在'
    err.error_code = 10000
  } else if (user.password !== passwordNow) {
    err.error_message = '帐号密码错误'
    err.error_code = 10000
  }
  return err
}

exports.generateToken = user => {
  const token = jwt.sign(
    {
      data: user.account
    },
    nodeconfig.token.secret,
    {
      expiresIn: nodeconfig.token.expires
    }
  )

  return token
}
