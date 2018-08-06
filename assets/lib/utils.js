/**
 * 从request中获取cookie
 * @param {String} cookie cookie
 * @param {String} key 键
 */
export const getCookieFromReq = (cookie, key) => {
  let bool = cookie && cookie.indexOf(key) > -1
  if (bool) {
    let start = cookie.indexOf(key) + key.length + 1
    let end = cookie.indexOf(';', start)
    if (end === -1) {
      end = cookie.length
    }
    let value = cookie.slice(start, end)
    return escape(value)
  }
  return ''
}
