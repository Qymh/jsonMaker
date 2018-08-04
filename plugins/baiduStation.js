export default ({ app: { router } }) => {
  router.afterEach(() => {
    // 百度站长平台
    var bp = document.createElement('script')
    var curProtocol = window.location.protocol.split(':')[0]
    if (curProtocol === 'https') {
      bp.src = 'https://zz.bdstatic.com/linksubmit/push.js'
    } else {
      bp.src = 'http://push.zhanzhang.baidu.com/push.js'
    }
    var w = document.getElementsByTagName('script')[0]
    w.parentNode.insertBefore(bp, w)
  })
}
