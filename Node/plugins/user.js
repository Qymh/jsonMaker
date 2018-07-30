const jwt = require('jsonwebtoken')
const nodeconfig = require('../config/nodeconfig')
const CommonPlugins = require('./common')

// 处理用户登陆
exports.dealLogin = user => {
  const userLater = {}
  const token = this.generateToken(user)
  userLater.token = token
  return userLater
}

// 处理用户登陆错误
exports.dealLoginError = (user, passwordNow) => {
  const errLater = {}
  if (user === null) {
    errLater.error_message = '用户不存在'
    errLater.error_code = nodeconfig.code.noUser
  } else if (user.password !== passwordNow) {
    errLater.error_message = '密码错误'
    errLater.error_code = nodeconfig.code.wrongPassword
  }
  return errLater
}

// 处理用户注册错误
exports.dealRegisterError = err => {
  const errLater = {}
  if (err.message.indexOf('duplicate key error') > -1) {
    errLater.error_message = '帐号已存在'
    errLater.error_code = nodeconfig.code.existData
    return errLater
  }
  if (err.errors) {
    return CommonPlugins.dealValidatorData(err)
  }
}

// 构造token
exports.generateToken = user => {
  const token = jwt.sign(
    {
      data: user.id
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
  try {
    const data = jwt.verify(token, nodeconfig.token.secret)
    const { iat, exp } = data
    if (exp > iat) {
      return data
    } else {
      return nodeconfig.code.outDateToken
    }
  } catch (error) {
    return ''
  }
}
