<template>
  <div>
    <h1>Welcome</h1>
    <p>Practical test to apply for a full-stack JS developer job. I hope they hire me 🤓 !</p>
    <hr>
    <h2>Summary</h2>
    <h5>Total clients: {{ clients.length }}</h5>
    <h5>Total providers: {{ providers.length }}</h5>
  </div>
</template>

<script>
  import * as types from '../store/types'

  export default {
    computed: {
      clients() {
        return this.$store.getters[types.CLIENTS]
      },
      providers() {
        return this.$store.getters[types.PROVIDERS]
      }
    }
  }
</script>

<style lang="css">

</style>
