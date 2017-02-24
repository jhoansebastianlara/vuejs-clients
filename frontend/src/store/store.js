import Vue from 'vue'
import Vuex from 'vuex'
import providers from './modules/providers'
import clients from './modules/clients'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    providers,
    clients
  }
})
