import property from '~/assets/actions/property'
import Vue from 'vue'
const vm = new Vue()

const state = {
  _propertiesArr: []
}

const getters = {
  propertiesArr: state => state._propertiesArr
}

const mutations = {
  _addProperty(state, obj) {
    state._propertiesArr.push(obj)
    vm.$message({
      message: '添加成功',
      type: 'success',
      duration: 1500
    })
  },
  _getProperties(state, arr) {
    state._propertiesArr = arr
  },
  _deleteProperty(state, index) {
    state._propertiesArr.splice(index, 1)
  },
  _putProperty() {
    vm.$message({
      message: '修改成功',
      type: 'success',
      duration: 1500
    })
    window.location.reload()
  }
}

const actions = {
  // 添加属性值
  async addProperty({ commit }, { apiId, name }) {
    await property
      .addProperty(apiId, name)
      .then(data => {
        commit('_addProperty', data)
      })
      .catch(() => {})
  },
  // 获取属性值
  async getProperties({ commit }, { apiId, redirect }) {
    await property
      .getProperties(apiId)
      .then(data => {
        for (const item of data) {
          item.value = ''
        }
        commit('_getProperties', data)
      })
      .catch(() => {
        redirect({
          path: '/login',
          query: {
            errorMessage: 'api不存在,请重新登陆'
          }
        })
      })
  },
  // 删除属性值
  async deleteProperty({ commit }, { apiId, propertyId, index }) {
    await property
      .deleteProperty(apiId, propertyId)
      .then(() => {
        commit('_deleteProperty', index)
      })
      .catch(() => {})
  },
  // 修改属性值
  async putProperty({ commit }, { apiId, propertyId, value }) {
    await property
      .putProperty(apiId, propertyId, value)
      .then(() => {
        commit('_putProperty')
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
