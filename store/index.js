import Vue from 'vue'
import Vuex from 'vuex'
import api from './modules/api'
import system from './modules/system'

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    namespaced: true,
    modules: {
      api,
      system
    }
  })

export default store
