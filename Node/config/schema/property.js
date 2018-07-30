exports.PROPERTYSCHEMACONFIG = {
  // 属性名
  name: {
    type: String,
    required: [true, '属性名不能为空'],
    minlength: [3, '属性长度需要大于等于3'],
    maxlength: [18, '属性长度需要小于等于18'],
    trim: true
  },
  // 属性类型
  type: {
    type: String,
    required: [true, '属性类型不能为空'],
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
