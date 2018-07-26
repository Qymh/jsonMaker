exports.APISCHEMACONFIG = {
  // api名字
  apiName: {
    type: String,
    minlength: [3, 'api长度需要大于等于3'],
    maxlength: [18, 'api长度需要小于等于18'],
    required: [true, 'api不能为空'],
    trim: true
  },
  // 描述
  description: {
    type: String,
    maxlength: [50, '描述长度需要小于等于50个字符'],
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
