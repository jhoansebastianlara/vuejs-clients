<template>
  <div class="container">
    <app-header></app-header>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import * as types from './store/types'
  import Header from './components/Header.vue'

  export default {
    components: {
      appHeader: Header
    },
    created() {
      this.$store.dispatch(types.SET_PROVIDERS)
      this.$store.dispatch(types.SET_CLIENTS)
    }
  }
</script>

<style lang="scss">
</style>
