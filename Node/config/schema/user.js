exports.USERSCHEMACONFIG = {
  // 帐号
  account: {
    type: String || Number,
    required: [true, '帐号不能为空'],
    unique: [true, '帐号已经存在'],
    minlength: [5, '帐号长度大于等于5'],
    maxlength: [18, '帐号长度小于等于18'],
    trim: true
  },
  // 密码
  password: {
    type: String || Number,
    required: [true, '密码不能为空'],
    minlength: [8, '密码长度大于等于8'],
    maxlength: [18, '密码长度小于等于18'],
    trim: true
  },
  //  name
  name: {
    type: String || Number,
    minlength: [2, '姓名长度不能低于2'],
    maxlength: [2, '姓名长度不能大于8'],
    trim: true
  }
}
