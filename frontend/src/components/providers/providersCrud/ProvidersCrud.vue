<template>
  <div>
    <provider-form></provider-form>
    <provider-table></provider-table>
  </div>
</template>

<script>
  import * as types from '../../../store/types'
  import ProviderForm from './ProviderForm.vue'
  import ProviderTable from './ProviderTable.vue'

  export default {
    components: {
      ProviderForm,
      ProviderTable
    }
  }
</script>

<style lang="scss">

  .providers-container {
    border: 1px solid lightgray;
    border-radius: .25em;
    padding: .3em .4em;
    margin: .1em;
    overflow-y: scroll;
    max-height: 10em;

    .item {
      margin: 0;

      .provider-name {
        padding: 0 .3em !important;
      }

      .icons {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        img {
          height: 1em;
        }
      }
    }
}

</style>
