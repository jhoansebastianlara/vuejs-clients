<template>
  <div class="row item">
    <div class="col-xs-1 no-padding">
      <input type="checkbox"
        :value="provider.id"
        v-model="checked"
        @change="providerToggle">
    </div>
    <div class="col-xs-9 provider-name truncate-text no-padding">
      {{ provider.name }}
    </div>
    <div class="col-xs-2 no-padding icons">
      <img src="../../../assets/icons/edit.png"
          class="icon"
          alt="Edit"
          @click="updateProvider">
      <img src="../../../assets/icons/delete.png"
          class="icon"
          alt="Delete"
          @click="deleteProvider">
    </div>
  </div>
</template>

<script>
  import { eventBus } from '../../../main'

  export default {
    data(){
      return {
        checked: false
      }
    },
    props: ['provider'],
    methods: {
      updateProvider() {
        eventBus.$emit('startUpdateProvider', this.provider)
      },
      deleteProvider() {
        // we could use .$store.dispatch as well, but I try to test .$emit behaviour :)
        this.$emit('providerDeleted', this.provider)
      },
      providerToggle() {
        eventBus.$emit('providerToggle', this.provider, this.checked)
      }
    }
  }
</script>

<style lang="scss">
</style>
