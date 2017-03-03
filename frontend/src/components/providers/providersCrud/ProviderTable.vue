<template>
  <div class="row">
    <div class="col-xs-offset-3 col-xs-9 col-sm-offset-3 col-sm-6 no-padding-right">
      <div class="providers-container" v-if="providers.length > 0">
          <div class="row item" v-for="provider in providers">
            <div class="col-xs-1 no-padding">
              <input type="checkbox"
                :value="provider.id"
                v-model="providersIdsSelected">
            </div>
            <div class="col-xs-9 provider-name truncate-text no-padding">
              {{ provider.name }}
            </div>
            <div class="col-xs-2 no-padding icons">
              <img src="../../../assets/icons/edit.png"
                  class="icon"
                  alt="Edit"
                  @click="onUpdateProvider(provider)">
              <img src="../../../assets/icons/delete.png"
                  class="icon"
                  alt="Delete"
                  @click="onDeleteProvider(provider)">
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import * as types from '../../../store/types'
  import { eventBus } from '../../../main'

  export default {
    data() {
      return {
        providersIdsSelected: []
      }
    },
    computed: {
      providers() {
        return this.$store.getters[types.PROVIDERS]
      }
    },
    watch: {
      providersIdsSelected(newProvidersSelected) {
        console.log(newProvidersSelected)
        eventBus.$emit('newSelectedProviders', newProvidersSelected)
      }
    },
    methods: {
      ...mapActions({
        deleteProvider: types.DELETE_PROVIDER
      }),
      onUpdateProvider(provider) {
        eventBus.$emit('startUpdateProvider', provider)
      },
      onDeleteProvider(provider) {
        if (confirm('Are you sure you want to delete this provider?')) {
          this.deleteProvider(provider.id)
        }
      }
    },
    created() {
      eventBus.$on('updateSelectedProviders', (providers) => {
        this.providersIdsSelected = providers
      })
    }
  }
</script>

<style lang="css">
</style>
