// token设置
exports.token = {
  secret: 'Qymh',
  expires: '7 days'
}

// 错误code
exports.code = {
  // 用户不存在
  noUser: 10001,
  // 密码错误
  wrongPassword: 10002,
  // token过期
  outDateToken: 10003,
  // 检验不符合规则
  notValidate: 10004,
  // 已存在的数据
  existData: 10005,
  // 未知错误
  unknown: 100099,
  // 未知错误文字
  unknownText: '未知错误,请重新登陆试试'
}

// session
exports.session = {
  secret: 'Qymh',
  maxAge: 10000
}
