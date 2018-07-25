const nodeconfig = require('../config/nodeconfig')

// 处理错误数据
exports.dealValidatorData = err => {
  const errLater = {}
  const errorsArr = Object.keys(err.errors)
  for (const item of errorsArr) {
    errLater.error_message = err.errors[item].message
    errLater.error_code = nodeconfig.code.notValidate
    return errLater
  }
}
