exports.APISCHEMACONFIG = {
  // api名字
  apiName: {
    type: String,
    index: [true, 'api已经存在'],
    unique: [true, 'api已经存在'],
    minlength: [3, 'api长度大于等于3'],
    maxlength: [18, 'api长度小于等于18'],
    required: [true, 'api不能为空'],
    trim: true
  },
  // 描述
  description: {
    type: String,
    maxlength: [50, '描述不能超过50个字符'],
    required: [true, '描述不能为空'],
    trim: true
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
