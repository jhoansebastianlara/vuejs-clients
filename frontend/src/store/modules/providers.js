import * as types from '../types'
import { ENDPOINTS, HTTP_STATUS, ERROR_CODES }  from '../../constants'
import Vue from 'vue'

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
  [types.ADD_PROVIDER]: ({commit, state}, provider) => {

    return new Promise((resolve, reject) => {
      // POST /clients
      Vue.http.post(ENDPOINTS.PROVIDERS.ROOT, provider)
        .then(response => {
          let newProvider = response.body
          // validate if the resource was created
          if (response.status == HTTP_STATUS.CREATED && newProvider.id) {
            commit(types.MUTATE_ADD_PROVIDER, newProvider)
            resolve({
              success: true,
              data: {
                provider: newProvider
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

  [types.UPDATE_PROVIDER]: ({commit}, provider) => {
    return new Promise((resolve, reject) => {
      // PUT /clients
      Vue.http.put(ENDPOINTS.PROVIDERS.DETAIL.replace(':id', provider.id), provider)
        .then(response => {
          let success = response.body

          if (response.status == HTTP_STATUS.OK && success) {
            commit(types.MUTATE_UPDATE_PROVIDER, provider)
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

  [types.DELETE_PROVIDER]: ({commit}, providerId) => {
    return new Promise((resolve, reject) => {
      // DELETE /clients
      Vue.http.delete(ENDPOINTS.PROVIDERS.DETAIL.replace(':id', providerId))
        .then(response => {
          let success = response.body

          if (response.status == HTTP_STATUS.OK && success) {
            commit(types.MUTATE_DELETE_PROVIDER, providerId)
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
