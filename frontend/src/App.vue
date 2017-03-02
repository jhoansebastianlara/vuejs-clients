<template>
  <div class="container">
    <app-header></app-header>
    <div>
      <transition name="slide" mode="out-in">
        <router-view></router-view>
      </transition>
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
      // load clients and providers from the server
      this.$store.dispatch(types.SET_CLIENTS_AND_PROVIDERS)
    }
  }
</script>

<style lang="scss">
  .slide-enter-active {
      animation: slide-in 200ms ease-out forwards;
  }

  .slide-leave-active {
      animation: slide-out 200ms ease-out forwards;
  }

  @keyframes slide-in {
      from {
          transform: translateY(-30px);
          opacity: 0;
      }
      to {
          transform: translateY(0);
          opacity: 1;
      }
  }

  @keyframes slide-out {
      from {
          transform: translateY(0);
          opacity: 1;
      }
      to {
          transform: translateY(-30px);
          opacity: 0;
      }
  }
</style>
