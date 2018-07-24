exports.USERSCHEMACONFIG = {
  // 帐号
  account: {
    type: String || Number,
    index: [true, '帐号已经存在'],
    unique: [true, '帐号已经存在'],
    required: [true, '帐号不能为空'],
    minlength: [5, '帐号长度需要大于等于5'],
    maxlength: [18, '帐号长度需要小于等于18'],
    trim: true
  },
  // 密码
  password: {
    type: String || Number,
    required: [true, '密码不能为空'],
    minlength: [8, '密码长度需要大于等于8'],
    maxlength: [18, '密码长度需要小于等于18'],
    trim: true
  },
  // 名字
  userName: {
    type: String || Number,
    default: '未命名',
    minlength: [2, '姓名长度需要大于等于2'],
    maxlength: [8, '姓名长度需要小于等于8'],
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
