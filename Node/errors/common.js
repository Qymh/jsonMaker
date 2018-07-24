const nodeconfig = require('../config/nodeconfig')

// 公共错误返回
exports.responseError = (res, err) => {
  let data = err
  res.json(data)
}

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

// 处理已存在的数据
exports.dealExistData = (details, err) => {
  if (err.error_message.indexOf('duplicate key error') > -1) {
    err.error_message = `${details}已存在`
  }
  return err
}
