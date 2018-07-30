const userPlugin = require('../plugins/user')
const nodeconfig = require('../config/nodeconfig')

// 验证token是否过期
exports.authenticate = (req, res, next) => {
  const token = req.headers.authenticate
  res.locals.token = token
  if (token) {
    const code = userPlugin.verifyToken(token)
    if (code === nodeconfig.code.outDateToken) {
      const err = {
        error_code: code,
        error_message: 'token过期'
      }
      res.json(err)
    }
  }
  next()
}
