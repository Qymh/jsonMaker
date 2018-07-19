const userPlugin = require('../plugins/user')
const errors = require('../errors/common')

// 验证token是否过期
exports.authenticate = (req, res, next) => {
  const token = req.headers.authenticate
  if (token) {
    const code = userPlugin.verifyToken(token)
    if (code) {
      const err = {
        error_code: code,
        error_message: 'token过期'
      }
      errors.responseError(res, err)
    }
  }
  next()
}
