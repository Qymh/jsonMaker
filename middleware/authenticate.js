import Vue from 'vue'
import { getCookieFromReq } from '../assets/lib/utils'
import system from '../assets/actions/system'

export default function({ store, route, redirect, req }) {
  const vm = new Vue()
  const isClient = process.client
  const isServer = process.server
  let token = store.getters.token

  if (route.meta && route.meta[0].auth) {
    if (token) {
      return
    } else {
      if (isClient) {
        token = vm.$cookie.get('token')
        if (token) {
          store.dispatch('setSystem', { key: '_token', value: token })
          store.dispatch('setSystem', { key: '_isFirstIn', value: false })
        }
      }
      if (isServer) {
        token = getCookieFromReq(req, 'token')
        store.dispatch('setSystem', { key: '_token', value: token })
        store.dispatch('setSystem', { key: '_isFirstIn', value: false })
      }
      if (token) {
        system.getSystem(token).then(data => {
          const { userName, account } = data
          store.dispatch('setSystem', { key: '_userName', value: userName })
          store.dispatch('setSystem', { key: '_account', value: account })
          store.dispatch('setSystem', { key: '_token', value: token })
          store.dispatch('setSystem', { key: '_isFirstIn', value: false })
          process.env.TOKEN = token
        })
      } else {
        redirect('/login')
      }
    }
  }
}
