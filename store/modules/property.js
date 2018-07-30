import property from '~/assets/actions/property'

const state = {
  _propertyArr: []
}

const getters = {
  propertyArr: state => state._propertyArr
}

const mutations = {
  _addProperty() {
    console.log(1)
  }
}

const actions = {
  async addProperty({ commit }, { apiId, name, type }) {
    await property.addProperty(apiId, name, type).then(data => {
      commit('_addProperty', data)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
