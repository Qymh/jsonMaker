import Vue from 'vue'

export default function({ route, redirect }) {
  if (route.meta.auth) {
    const vm = new Vue()
    if (!vm.$cookie.get('token')) {
      redirect('/login')
    }
  }
}
