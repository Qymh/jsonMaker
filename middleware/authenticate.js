import Vue from 'vue'

export default function({ store, route, redirect }) {
  const token = store.getters.token
  const isFirstIn = store.getters.isFirstIn
  const vm = new Vue()
  console.log(process.isClient)
  if (process.isClient && isFirstIn) {
    const token = vm.$cookie.get('token')
    if (token) {
      store.dispatch('setSystem', { key: '_token', value: token })
      store.dispatch('setSystem', { key: '_isFirstIn', value: false })
    }
  }
  if (route.meta) {
    if (!token) {
      redirect('/login')
    }
  }
}
