// token设置
exports.token = {
  secret: 'Qymh',
  expires: '7 days'
}

// 错误code
exports.code = {
  noUser: 10001,
  wrongPassword: 10002,
  outDateToken: 10003
}

// session
exports.session = {
  secret: 'Qymh',
  maxAge: 10000
}
