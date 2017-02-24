<template>
  <div>
    <div class="table-head">
      <h1>Providers</h1>
    </div>
    <div class="table-content">
      <table>
        <tbody>
          <row-provider v-for="provider in providers" :provider="provider"></row-provider>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import * as types from '../../store/types'
  import Provider from './Provider.vue'

  export default {
    computed: {
      providers() {
        return this.$store.getters[types.PROVIDERS]
      }
    },
    components: {
      rowProvider: Provider
    }
  }
</script>

<style lang="scss">

</style>
