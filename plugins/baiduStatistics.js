export default ({ app: { router } }) => {
  router.afterEach(() => {
    // 百度统计
    var _hmt = _hmt || []
    var hm = document.createElement('script')
    hm.src = 'https://hm.baidu.com/hm.js?fa502c98dd7c3c357c291379ec7a5aa5'
    var s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(hm, s)
  })
}
