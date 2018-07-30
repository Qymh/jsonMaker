export default {
  /**
   * 密码验证
   * @param {Object} rule 规则
   * @param {Any} value 输入的值
   * @param {Function} callback 回调函数
   */
  password(rule, value, callback) {
    if (value.length < 8 || value.length > 18) {
      callback(new Error('密码长度在8到18位'))
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
    if (value.length < 8 || value.length > 18) {
      callback(new Error('密码长度在8到18位'))
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
  },

  /**
   * 只能是英文
   * @param {Object} rule 规则
   * @param {Any} value 输入的值
   * @param {Function} callback 回调函数
   */
  onlyEng(rule, value, callback) {
    if (value.length < 3 || value.value > 18) {
      callback(new Error('长度在3到18位'))
    } else {
      let reg = /^[a-zA-Z]+$/
      if (!reg.test(value)) {
        callback(new Error('名字只能为英文'))
      }
      callback()
    }
  }
}
