const state = {
  _userName: '',
  _account: '',
  _token: '',
  _isFirstIn: true
}

const getters = {
  userName: state => state._userName,
  account: state => state._account,
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
    commit('_setSystem', { key, value })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
