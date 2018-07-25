import Vue from 'vue'
import { getCookieFromReq } from '../assets/lib/utils'
import system from '../assets/actions/system'

export default function({ store, route, redirect, req }) {
  const vm = new Vue()
  const isClient = process.client
  const isServer = process.server
  let token = store.getters.token
  let cookieToken = isClient && vm.$cookie.get('token')

  if (route.meta && route.meta[0].auth) {
    if (token && cookieToken) {
      return ''
    } else {
      process.env.TOKEN = ''
      if (isClient) {
        token = vm.$cookie.get('token')
        if (token) {
          store.dispatch('setSystem', { key: '_token', value: token })
          store.dispatch('setSystem', { key: '_isFirstIn', value: false })
        } else {
          store.dispatch('setSystem', { key: '_token', value: '' })
        }
      }
      if (isServer) {
        token = getCookieFromReq(req, 'token')
        if (token) {
          store.dispatch('setSystem', { key: '_token', value: token })
          store.dispatch('setSystem', { key: '_isFirstIn', value: false })
        } else {
          store.dispatch('setSystem', { key: '_token', value: '' })
        }
      }
      if (token) {
        process.TOKEN = token
        system.getSystem(token).then(data => {
          const { userName, account } = data
          store.dispatch('setSystem', { key: '_userName', value: userName })
          store.dispatch('setSystem', { key: '_account', value: account })
          store.dispatch('setSystem', { key: '_token', value: token })
          store.dispatch('setSystem', { key: '_isFirstIn', value: false })
        })
      } else {
        redirect('/login')
      }
    }
  }
}
