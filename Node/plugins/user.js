const jwt = require('jsonwebtoken')
const nodeconfig = require('../config/nodeconfig')

// 处理用户登陆
exports.dealLogin = (user, passwordNow) => {
  const err = {}
  if (user === null) {
    err.error_message = '用户不存在'
    err.error_code = nodeconfig.code.noUser
  } else if (user.password !== passwordNow) {
    err.error_message = '帐号密码错误'
    err.error_code = nodeconfig.code.wrongPassword
  }
  return err
}

// 构造token
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

// 解析token
exports.verifyToken = token => {
  let code = ''
  try {
    jwt.verify(token, nodeconfig.token.secret)
  } catch (error) {
    code = nodeconfig.code.outDateToken
  }
  return code
}
