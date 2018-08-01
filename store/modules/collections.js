import collections from '~/assets/actions/collections'

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
    console.log(obj)
  },
  _getCollections(state, data) {
    state._collectionsArr = data.collections
    state._collectionsTableArr = data.tableArr
  }
}

const actions = {
  async addCollections({ commit }, { apiId, propertiesArr }) {
    await collections
      .addCollections(apiId, propertiesArr)
      .then(data => {
        commit('_addCollections', data)
      })
      .catch(() => {})
  },
  async getCollections({ commit }, { apiId }) {
    await collections
      .getCollections(apiId)
      .then(data => {
        commit('_getCollections', data)
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
