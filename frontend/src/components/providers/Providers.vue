<template>
  <div>
    <div class="table-head row">
      <div class="col-xs-12 col-sm-3">
        <h1>Providers</h1>
      </div>
      <div class="col-xs-12 col-sm-offset-2 col-sm-7">
        <input type="text" v-model.trim="filterText" placeholder="Search">
      </div>
    </div>
    <div class="table-content row">
      <table>
        <thead>
          <tr>
            <th v-for="prop in tableProps"
              :style="{width: prop.width + '%'}">{{ prop.name }}</th>
          </tr>
        </thead>
        <tbody>
          <row-provider v-for="provider in filteredProviders" :provider="provider"></row-provider>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import * as types from '../../store/types'
  import Provider from './Provider.vue'

  export default {
    data() {
      return {
        tableProps: [
          { name: 'Name', width: 100 }
        ],
        filterText: ''
      }
    },
    computed: {
      providers() {
        return this.$store.getters[types.PROVIDERS]
      },
      filteredProviders() {
        return this.providers.filter((element) => {
          var name = element.name ? element.name.toLowerCase() : null
          return name && name.match(this.filterText.toLowerCase())
        })
      }
    },
    created(){
      console.log('created')
      let filtered = this.providers.filter(element => {
        console.log(element.name)
        return element.name && element.name.match('Main')
      })
      console.log(filtered)
    },
    components: {
      rowProvider: Provider
    }
  }
</script>

<style lang="scss">

</style>
