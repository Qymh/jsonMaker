exports.USERSCHEMACONFIG = {
  // 帐号
  account: {
    type: String || Number,
    index: [true, '帐号已经存在'],
    unique: [true, '帐号已经存在'],
    required: [true, '帐号不能为空'],
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
    default: '未命名',
    minlength: [2, '姓名长度不能低于2'],
    maxlength: [8, '姓名长度不能大于8'],
    trim: true
  },
  // token
  token: {
    type: String
  },
  // schema配置
  options: {
    versionKey: 'v1.0',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
}
