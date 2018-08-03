import api from '~/assets/actions/api'
import Vue from 'vue'
const vm = new Vue()

const state = {
  _api: []
}

const getters = {
  api: state => state._api
}

const mutations = {
  _getApi(state, arr) {
    state._api = arr
  },
  _addApi(state, data) {
    state._api.unshift(data)
    vm.$message({
      message: '添加成功',
      type: 'success',
      duration: 1500
    })
  },
  _deleteApi(state, index) {
    state._api.splice(index, 1)
    vm.$message({
      message: '删除成功',
      type: 'success',
      duration: 1500
    })
  }
}

const actions = {
  // 获取api
  async getApi({ commit }) {
    await api
      .getApi()
      .then(arr => {
        commit('_getApi', arr)
      })
      .catch(() => {})
  },
  // 添加api
  async addApi({ commit }, obj) {
    const { apiName, description } = obj
    await api
      .addApi(apiName, description)
      .then(data => {
        commit('_addApi', data)
      })
      .catch(() => {})
  },
  // 删除api
  async deleteApi({ commit }, obj) {
    const { apiId, index } = obj
    await api
      .deleteApi(apiId)
      .then(() => {
        commit('_deleteApi', index)
      })
      .catch(() => {})
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
