import api from '~/assets/actions/api'

const state = {
  _apiInfors: []
}

const getters = {
  apiInfors: state => state._apiInfors
}

const mutations = {
  _getApiInfors(state, arr) {
    state._apiInfors = arr
  },
  _addApiInfors(state, data) {
    state._apiInfors.unshift(data)
  }
}

const actions = {
  async getApiInfors({ commit }) {
    await api
      .getApi()
      .then(arr => {
        commit('_getApiInfors', arr)
      })
      .catch(() => {})
  },
  async addApiInfors({ commit }, obj) {
    const { apiName, description } = obj
    await api
      .addApi(apiName, description)
      .then(data => {
        commit('_addApiInfors', data)
      })
      .catch(() => {})
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
