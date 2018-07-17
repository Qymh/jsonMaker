export default {
  /**
   * 密码验证
   * @param {Object} rule 规则
   * @param {Any} value 输入的值
   * @param {Function} callback 回调函数
   */
  password(rule, value, callback) {
    if (value.length < 8 || value.length > 15) {
      callback(new Error('密码长度在8到15位'))
    } else {
      let reg = /^[0-9a-zA-Z]+$/
      if (!reg.test(value)) {
        callback(new Error('密码只能为数字或者英文'))
      }
      callback()
    }
    callback()
  },
  /**
   * 确认密码验证
   * @param {Object} rule 规则
   * @param {Any} value 输入的值
   * @param {Function} callback 回调函数
   */
  passwordAgain(rule, value, callback) {
    if (value.length < 8 || value.length > 15) {
      callback(new Error('密码长度在8到15位'))
    } else {
      let reg = /^[0-9a-zA-Z]+$/
      if (!reg.test(value)) {
        callback(new Error('密码只能为数字或者英文'))
      }
      if (value !== this.login.password) {
        callback(new Error('两次密码不一致'))
      }
      callback()
    }
    callback()
  }
}
