import Vue from 'vue'
import { getCookieFromReq } from '../assets/lib/utils'
import system from '../assets/actions/system'

export default function({ store, route, redirect, req }) {
  const vm = new Vue()
  // 是否在客户端
  const isClient = process.client
  // 是否在服务端
  const isServer = process.server
  // vuex中的token
  let token = store.getters.token
  // cookie中的token
  const cookieToken = isClient && vm.$cookie.get('token')
  // 用户名字
  const userName = isClient
    ? vm.$cookie.get('token')
    : getCookieFromReq(req.headers.cookie, 'userName')

  // 需要用户登陆才能访问的页面
  if (route.meta && route.meta[0].auth) {
    // token存在不进行操作
    if (token && cookieToken) {
      return ''
    } else {
      process.env.TOKEN = ''
      // 客户端设置vuex
      if (isClient) {
        token = vm.$cookie.get('token')
        if (token) {
          store.dispatch('system/setSystem', { key: '_token', value: token })
          store.dispatch('system/setSystem', {
            key: '_isFirstIn',
            value: false
          })
        } else {
          store.dispatch('system/setSystem', { key: '_token', value: '' })
        }
      }
      // 服务器端设置vuex
      if (isServer) {
        token = getCookieFromReq(req.headers.cookie, 'token')
        if (token) {
          store.dispatch('system/setSystem', { key: '_token', value: token })
          store.dispatch('system/setSystem', {
            key: '_isFirstIn',
            value: false
          })
        } else {
          store.dispatch('system/setSystem', { key: '_token', value: '' })
        }
      }
      // token存在获取系统参数并写入vuex
      if (token) {
        process.TOKEN = token
        system.getSystem(token).then(data => {
          const { userName, account } = data
          store.dispatch('system/setSystem', {
            key: '_userName',
            value: userName
          })
          store.dispatch('system/setSystem', {
            key: '_account',
            value: account
          })
          store.dispatch('system/setSystem', { key: '_token', value: token })
          store.dispatch('system/setSystem', {
            key: '_isFirstIn',
            value: false
          })
        })
      } else {
        redirect('/login')
      }
    }
  } else {
    // 自动登陆页面
    if (userName) {
      if (!route.meta[0].notAuth) {
        redirect(`/${userName}`)
      }
    } else {
      if (!route.meta[0].notAuth) {
        redirect('/login')
      }
    }
  }
}
