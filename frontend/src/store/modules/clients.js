import clients from '../../data/clients'
import * as types from '../types'

const state = {
  clients: []
}

const getters = {
  [types.CLIENTS]: state => {
    return state.clients
  }
}

const mutations = {
  [types.MUTATE_SET_CLIENTS] (state, clients) {
    state.clients = clients
  },

  [types.MUTATE_ADD_CLIENT] (state, client) {
    state.clients.unshift(client)
  },

  [types.MUTATE_UPDATE_CLIENT] (state, client) {
    let indexClient = state.clients.findIndex(element => element.id == client.id)

    // checking if the client was found
    if (indexClient > -1) {
      state.clients.splice(indexClient, 1, client)
    }
  },

  [types.MUTATE_DELETE_CLIENT] (state, clientId) {
    let indexClient = state.clients.findIndex(element => element.id == clientId)
    console.log('remove: ', clientId, indexClient)
    // it checks if the client was found
    if (indexClient > -1) {
      state.clients.splice(indexClient, 1)
    }
  }
}

const actions = {
  [types.SET_CLIENTS]: ({commit}) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit(types.MUTATE_SET_CLIENTS, clients)
        resolve()
      }, 1000)
    })
  },

  [types.ADD_CLIENT]: ({commit, state}, client) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        client.id = state.clients.length
        commit(types.MUTATE_ADD_CLIENT, client)
        resolve()
      }, 1000)
    })
  },

  [types.UPDATE_CLIENT]: ({commit}, client) => {
    console.log('update client please')
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit(types.MUTATE_UPDATE_CLIENT, client)
        resolve()
      }, 1000)
    })
  },

  [types.DELETE_CLIENT]: ({commit}, clientId) => {
    console.log('[types.DELETE_CLIENT]', clientId)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit(types.MUTATE_DELETE_CLIENT, clientId)
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
