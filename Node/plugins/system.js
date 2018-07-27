const nodeconfig = require('../config/nodeconfig')

// 处理全局参数
exports.dealSystem = system => {
  try {
    let systemLater = {}
    const { account, userName } = system
    systemLater = { account, userName }
    return systemLater
  } catch (error) {
    return {}
  }
}

// 处理全局参数出错
exports.dealSystemErrors = err => {
  return {
    error_code: err.code || nodeconfig.code.unknown,
    error_message: err.message
  }
}
