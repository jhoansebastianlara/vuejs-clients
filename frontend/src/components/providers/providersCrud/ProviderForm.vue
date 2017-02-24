<template>
  <div class="row">
    <div class="col-xs-3">
      <label for="provider">Providers:</label>
    </div>
    <div class="col-xs-6">
      <input type="text"
      id="provider"
      maxlength="100"
      :ref="'providerNameInput'"
      v-model.trim="providerName">
    </div>
    <div class="col-xs-3 full-button-container">
      <button type="button"
      name="button"
      class="full-button"
      :disabled="providerName == '' || loading"
      @click="save">{{ buttonSaveTitle }}</button>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import * as types from '../../../store/types'
  import { eventBus } from '../../../main'

  export default {
    data: function() {
      return {
        providerName: '',
        // Indicates whether the form is being used to add or update a provider,
        // a new provider doesn't have id
        providerId: null,
        // Indicate whether an async action is in currently executing
        loading: false
      }
    },
    computed: {
      buttonSaveTitle() {
        return this.loading ? 'Saving...' : (this.providerId ? 'Edit' : 'Add Provider')
      }
    },
    methods: {
      ...mapActions({
        updateProvider: types.UPDATE_PROVIDER,
        addProvider: types.ADD_PROVIDER
      }),
      save() {
        this.loading = true
        // it checks if should update or create a provider
        if (this.providerId) {
          let updatedProvider = {
            id: this.providerId,
            name: this.providerName
          }
          this.updateProvider(updatedProvider).then((data) => {
            this.loading = false
          })
        } else {
          this.addProvider(this.providerName).then((data) => {
            this.loading = false
          })
        }

        this.providerName = ''
        this.providerId = null

        this.$refs.providerNameInput.focus()
      }
    },
    created() {
      eventBus.$on('startUpdateProvider', (providerUpdate) => {
        if (providerUpdate && providerUpdate.id && providerUpdate.name) {
          this.providerId = providerUpdate.id
          this.providerName = providerUpdate.name
          this.$refs.providerNameInput.focus()
        }
      })
    }
  }
</script>

<style lang="css">

  .disabled {
    background-color: gray;
  }

</style>
