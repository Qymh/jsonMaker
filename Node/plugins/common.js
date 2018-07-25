const nodeconfig = require('../config/nodeconfig')

// 处理获取Api错误
exports.dealError = err => {
  return {
    error_code: err.code ? err.code : nodeconfig.code.unknown,
    error_message: err.message ? err.message : nodeconfig.code.unknownText
  }
}
