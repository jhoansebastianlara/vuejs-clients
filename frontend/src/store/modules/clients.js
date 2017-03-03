import * as types from '../types'
import { ENDPOINTS, HTTP_STATUS, ERROR_CODES }  from '../../constants'
import Vue from 'vue'

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

    // it checks if the client was found
    if (indexClient > -1) {
      state.clients.splice(indexClient, 1)
    }
  }
}

const actions = {
  [types.SET_CLIENTS_AND_PROVIDERS]: ({commit}) => {
    return new Promise((resolve, reject) => {
      // GET /clients
      Vue.http.get(ENDPOINTS.CLIENTS.ROOT)
        .then(response => {
          // validate the response status code is ok
          if (response.status == HTTP_STATUS.OK) {
            let data = response.body

            if (data.clients) {
              commit(types.MUTATE_SET_CLIENTS, data.clients)
            }

            if (data.providers) {
              commit(types.MUTATE_SET_PROVIDERS, data.providers)
            }

            resolve({success: true})
          } else {
            resolve({
              success: false,
              error: ERROR_CODES.INTERNAL_ERROR
            })
          }
        }, response => {
          // error callback
          reject({
            success: false,
            error: ERROR_CODES.INTERNAL_ERROR
          })
        })
    })
  },

  [types.FILTER_CLIENTS]: ({commit}, search) => {
    return new Promise((resolve, reject) => {
      var searchUrl = '?search=' + search
      // GET /clients
      Vue.http.get(ENDPOINTS.CLIENTS.ROOT + searchUrl)
        .then(response => {
          // validate the response status code is ok
          if (response.status == HTTP_STATUS.OK) {
            let data = response.body

            resolve({
              success: true,
              data: {
                clients: data.clients
              }
            })
          } else {
            resolve({
              success: false,
              error: ERROR_CODES.INTERNAL_ERROR
            })
          }
        }, response => {
          // error callback
          reject({
            success: false,
            error: ERROR_CODES.INTERNAL_ERROR
          })
        })
    })
  },

  [types.ADD_CLIENT]: ({commit, state}, client) => {
    return new Promise((resolve, reject) => {
      // POST /clients
      Vue.http.post(ENDPOINTS.CLIENTS.ROOT, client)
        .then(response => {

          let newClient = response.body
          // validate if the resource was created
          if (response.status == HTTP_STATUS.CREATED && newClient.id) {
            if (client.providers) {
              // The providers array is transformed to the expected format
              newClient.providers = client.providers.map(providerId => {return {id: providerId}})
            }
            commit(types.MUTATE_ADD_CLIENT, newClient)
            resolve({
              success: true,
              data: {
                client: newClient
              }
            })
          } else {
            resolve({
              success: false,
              error: ERROR_CODES.INTERNAL_ERROR
            })
          }
        }, response => {
          // error callback
          reject({
            success: false,
            error: response.body && response.body.error ? response.body.error.code : ERROR_CODES.INTERNAL_ERROR
          })
        })
    })
  },

  [types.UPDATE_CLIENT]: ({commit}, client) => {
    return new Promise((resolve, reject) => {
      // PUT /clients
      Vue.http.put(ENDPOINTS.CLIENTS.DETAIL.replace(':id', client.id), client)
        .then(response => {
          let success = response.body

          if (response.status == HTTP_STATUS.OK && success) {
            if (client.providers) {
              // The providers array is transformed to the expected format
              client.providers = client.providers.map(providerId => {return {id: providerId}})
            }
            commit(types.MUTATE_UPDATE_CLIENT, client)
            resolve({
              success: true
            })
          } else {
            resolve({
              success: false,
              error: ERROR_CODES.INTERNAL_ERROR
            })
          }
        }, response => {
          // error callback
          reject({
            success: false,
            error: response.body && response.body.error ? response.body.error.code : ERROR_CODES.INTERNAL_ERROR
          })
        })
    })
  },

  [types.DELETE_CLIENT]: ({commit}, clientId) => {
    return new Promise((resolve, reject) => {
      // DELETE /clients
      Vue.http.delete(ENDPOINTS.CLIENTS.DETAIL.replace(':id', clientId))
        .then(response => {
          let success = response.body

          if (response.status == HTTP_STATUS.OK && success) {
            commit(types.MUTATE_DELETE_CLIENT, clientId)
            resolve({
              success: true
            })
          } else {
            resolve({
              success: false,
              error: ERROR_CODES.INTERNAL_ERROR
            })
          }
        }, response => {
          // error callback
          reject({
            success: false,
            error: response.body && response.body.error ? response.body.error.code : ERROR_CODES.INTERNAL_ERROR
          })
        })
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
