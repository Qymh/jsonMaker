import Vue from 'vue'
import Vuex from 'vuex'
import api from './modules/api'
import system from './modules/system'
import property from './modules/property'
import collections from './modules/collections'

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    namespaced: true,
    modules: {
      api,
      system,
      property,
      collections
    }
  })

export default store
