import { COOKIECONFIG } from '../lib/appconfig'
const Cookie = Object.create(null)

Cookie.install = Vue => {
  Vue.prototype.$cookie = {
    /**
     * 设置cookie
     * @param {String} key 键
     * @param {String} value 值
     */
    set(key, value) {
      let now = new Date()
      now.setDate(now.getDate() + COOKIECONFIG.expiresDay)
      document.cookie = `${key}=${value};expires=${now.toUTCString()}`
    },
    /**
     * 获取cookie
     * @param {String}} key 键
     */
    get(key) {
      let bool = document.cookie.indexOf(key) > -1
      if (bool) {
        let start = document.cookie.indexOf(key) + key.length + 1
        let end = document.cookie.indexOf(';', start)
        if (end === -1) {
          end = document.cookie.length
        }
        let value = document.cookie.slice(start, end)
        return escape(value)
      }
      return ''
    },
    /**
     * 删除cookie
     * @param {String} key 键
     */
    delete(key) {
      let now = new Date()
      now.setDate(now.getDate() - 1)

      if (Array.isArray(key)) {
        for (let i in key) {
          let item = key[i]
          let value = this.get(item)
          document.cookie = `${item}=${value};expires=${now.toUTCString()}`
        }
      } else {
        let value = this.get(key)
        document.cookie = `${key}=${value};expires=${now.toUTCString()}`
      }
    }
  }
}

export default Cookie
