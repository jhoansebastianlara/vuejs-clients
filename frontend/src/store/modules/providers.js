import providers from '../../data/providers'
import * as types from '../types'

const state = {
  providers: []
}

const getters = {
  [types.PROVIDERS]: state => {
    return state.providers
  }
}

const mutations = {
  [types.MUTATE_SET_PROVIDERS] (state, providers) {
    state.providers = providers
  },

  [types.MUTATE_ADD_PROVIDER] (state, provider) {
    state.providers.unshift(provider)
  },

  [types.MUTATE_UPDATE_PROVIDER] (state, provider) {
    let indexProvider = state.providers.findIndex(element => element.id == provider.id)

    // it checks if the provider was found
    if (indexProvider > -1) {
      state.providers.splice(indexProvider, 1, provider)
    }
  },

  [types.MUTATE_DELETE_PROVIDER] (state, providerId) {
    let indexProvider = state.providers.findIndex(element => element.id == providerId)

    // it checks if the provider was found
    if (indexProvider > -1) {
      state.providers.splice(indexProvider, 1)
    }
  }
}

const actions = {
  // get current providers from the server
  [types.SET_PROVIDERS]: ({commit}) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit(types.MUTATE_SET_PROVIDERS, providers)
        resolve()
      }, 1000)
    })
  },

  [types.ADD_PROVIDER]: ({commit, state}, providerName) => {
    let provider = {
      id: state.providers.length,
      name: providerName
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit(types.MUTATE_ADD_PROVIDER, provider)
        resolve()
      }, 1000)
    })
  },

  [types.UPDATE_PROVIDER]: ({commit}, provider) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit(types.MUTATE_UPDATE_PROVIDER, provider)
        resolve()
      }, 1000)
    })
  },

  [types.DELETE_PROVIDER]: ({commit}, provider) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit(types.MUTATE_DELETE_PROVIDER, provider ? provider.id : null)
        resolve()
      }, 1000)
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
