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
  },
  _putApi(state, { apiName, description, index }) {
    state._api[index].apiName = apiName
    state._api[index].description = description
    vm.$message({
      message: '修改成功',
      type: 'success',
      duration: 1500
    })
  }
}

const actions = {
  // 获取api
  async getApi({ commit }, { userName, redirect }) {
    await api
      .getApi(userName)
      .then(arr => {
        commit('_getApi', arr)
      })
      .catch(() => {
        redirect({
          path: '/login',
          query: {
            errorMessage: '用户不存在,请重新登陆'
          }
        })
      })
  },
  // 添加api
  async addApi({ commit }, { apiName, description }) {
    await api
      .addApi(apiName, description)
      .then(data => {
        commit('_addApi', data)
      })
      .catch(() => {})
  },
  // 删除api
  async deleteApi({ commit }, { apiId, index }) {
    await api
      .deleteApi(apiId)
      .then(() => {
        commit('_deleteApi', index)
      })
      .catch(() => {})
  },
  // 修改api
  async putApi({ commit }, { apiId, apiName, description, index }) {
    await api
      .putApi(apiId, apiName, description)
      .then(() => {
        commit('_putApi', { apiName, description, index })
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
