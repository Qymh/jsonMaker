const state = {
  _userName: 'Qymh',
  _token: '',
  _isFirstIn: true
}

const getters = {
  userName: state => state._userName,
  token: state => state._token,
  isFirstIn: state => state._isFirstIn
}

const mutations = {
  _setSystem(state, { key, value }) {
    state[key] = value
  }
}

const actions = {
  setSystem({ commit }, { key, value }) {
    commit('_getSystem', { key, value })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
