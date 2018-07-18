// 处理账户已存在
exports.dealRegisterAccount = (details, err) => {
  if (err.error_message.indexOf('duplicate key error') > -1) {
    err.error_message = `${details}已存在`
  }
  return err
}
