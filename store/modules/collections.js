import collections from '~/assets/actions/collections'
import Vue from 'vue'
const vm = new Vue()

const state = {
  _collectionsArr: [],
  _collectionsTableArr: []
}

const getters = {
  collectionsArr: state => state._collectionsArr,
  collectionsTableArr: state => state._collectionsTableArr
}

const mutations = {
  _addCollections(state, obj) {
    if (!state._collectionsArr.length) {
      const arr = Object.keys(obj)
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        state._collectionsTableArr.push(item)
      }
    }
    state._collectionsArr.unshift(obj)
    vm.$message({
      message: '添加成功',
      type: 'success',
      duration: 1500
    })
  },
  _getCollections(state, data) {
    state._collectionsArr = data.collections
    state._collectionsTableArr = data.tableArr
  },
  _deleteCollections(state, index) {
    state._collectionsArr.splice(index, 1)
    if (!state._collectionsArr.length) {
      state._collectionsTableArr = []
    }
    vm.$message({
      message: '删除成功',
      type: 'success',
      duration: 1500
    })
  }
}

const actions = {
  // 添加集合
  async addCollections({ commit }, { apiId, propertiesArr }) {
    await collections
      .addCollections(apiId, propertiesArr)
      .then(data => {
        commit('_addCollections', data)
      })
      .catch(() => {})
  },
  // 获取集合
  async getCollections({ commit }, { apiId }) {
    await collections
      .getCollections(apiId)
      .then(data => {
        commit('_getCollections', data)
      })
      .catch(() => {})
  },
  // 删除集合
  async deleteCollections({ commit }, { apiId, collectionsId, index }) {
    await collections
      .deleteCollections(apiId, collectionsId)
      .then(() => {
        commit('_deleteCollections', index)
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
