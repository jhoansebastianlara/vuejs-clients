<template>
  <tr>
    <td>{{ client.name }}</td>
    <td>{{ client.email }}</td>
    <td>{{ client.phone | phone }}</td>
    <td>{{ providersNames }}</td>
    <td>
      <div class="options">
        <a class="default-link" @click="$emit('onEditClient', client)">Edit</a>
        <a class="danger-link" @click="clientDeleted">Delete</a>
      </div>
    </td>
  </tr>
</template>

<script>
  import * as types from '../../store/types'
  import { mapActions } from 'vuex'

  export default {
    props: ['client'],
    computed: {
      providers() {
        return this.$store.getters[types.PROVIDERS]
      },
      providersNames() {
        let provNames = ''
        let provider

        if (this.client && this.client.providers && Array.isArray(this.client.providers)) {
          this.client.providers.forEach((provider) => {
            provider = this.providers.find((element) => { return element.id == provider.id })
            provNames += provider && provider.name ? provider.name + ', ' : ''
          })
        }
        // remove the last tow characters: ', '
        provNames = provNames != '' ? provNames.substring(0, provNames.length - 2) : '-'

        return provNames
      }
    },
    methods: {
      ...mapActions({
        deleteClient: types.DELETE_CLIENT
      }),
      clientDeleted() {
        console.log('clientDeleted')
        if (confirm('Are you sure you want to delete this client?')) {
          this.deleteClient(this.client.id)
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../sass/app.scss";

  .options {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .link {
    text-decoration: underline;
    margin: 0 .2em;
  }

  .default-link {
    @extend .link;
    color: color(primary);
  }

  .danger-link {
    @extend .link;
    color: color(danger);
  }

</style>
