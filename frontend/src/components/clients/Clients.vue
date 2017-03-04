<template>
  <div>
    <div class="table-head row">
      <div class="col-xs-3 col-sm-2 flex-center-start">
        <h1>Clients</h1>
      </div>
      <div class="col-xs-5 col-sm-7 flex-center-start">
        <input type="text" v-model.trim="filterText" placeholder="Search by: Name, email or phone">
      </div>
      <div class="col-xs-4 col-sm-3 flex-center-end">
        <button type="button" @click="newClient">New Client</button>
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
          <tr v-if="loading" class="info-container">
            <td :colspan="tableProps.length">Searching...</td>
          </tr>
          <template v-if="filterText == ''">
            <row-client v-for="client in clients"
              :client="client"
              @onEditClient="editClient"></row-client>
          </template>
          <template v-else>
            <row-client v-for="client in filteredClients"
              :client="client"
              @onEditClient="editClient"></row-client>
          </template>
        </tbody>
      </table>
    </div>
    <!-- Form to add / update clients -->
    <client-form-modal
        v-if="showClientFormModal"
        @close="showClientFormModal = false"
        :client="clientEdit">
      <h3 slot="header">custom header</h3>
    </client-form-modal>
  </div>
</template>

<script>
  import * as types from '../../store/types'
  import * as _ from 'lodash'
  import { mapActions } from 'vuex'
  import Client from './Client.vue'
  import ClientFormModal from './ClientFormModal.vue'

  export default {
    data() {
      return {
        filterText: '',
        tableProps: [
          { name: 'Name', width: 25 },
          { name: 'Email', width: 25 },
          { name: 'Phone', width: 15 },
          { name: 'Providers', width: 25 },
          { name: 'Options', width: 10 }
        ],
        showClientFormModal: false,
        // used when a client is going to edit
        clientEdit: {},
        filteredClients: [],
        loading: false
      }
    },
    watch: {
      // whenever question changes, this function will run
      filterText (newQuestion) {
        // Waiting for the user to stop typing...
        this.loading = true
        this.search()
      },
      clients(newClients) {
        this.search()
      }
    },
    methods:{
      ...mapActions({
        filterClients: types.FILTER_CLIENTS,
      }),
      editClient(client) {
        this.clientEdit = client
        this.showClientFormModal = true
      },
      newClient() {
        this.clientEdit = {}
        this.showClientFormModal = true
      },
      // _.debounce is a function provided by lodash to limit how
      // often a particularly expensive operation can be run.
      // In this case, we want to limit how often we access
      // search method, waiting until the user has completely
      // finished typing before making the request.
      search: _.debounce(function () {
          this.filterClients(this.filterText).then(response => {
            if (response.success && response.data) {
              this.filteredClients = response.data.clients ? response.data.clients : []
            }
            this.loading = false
          }, errorResponse => {
            this.loading = false
          })
        },
        // This is the number of milliseconds we wait for the
        // user to stop typing.
        500
      )
    },
    computed: {
      clients() {
        return this.$store.getters[types.CLIENTS]
      }
    },
    components: {
      rowClient: Client,
      clientFormModal: ClientFormModal
    }
  }
</script>

<style lang="scss">
  @import "../../sass/app.scss";

  .table-head {
    display: flex;
    align-items: center;
    // justify-content: space-between;
    background: color(secondary);
    padding: .5em;
    border: 1px solid lightgray;
    border-bottom: none;

    h1 {
      margin: 0;
      color: color(primary);
      font-size: 1.2rem;
    }
  }

  .table-content {
    table {
      width: 100%;
      border-collapse: collapse;

      thead {
        background-color: #F2F2F2;
        height: 1em;

        tr {
          height: 2.2em;
          color: color(gray);

          th {
              border: 1px solid #d4d4d4;
          }
        }
      }

      tbody {
        tr {
          height: 2em;

          td {
              padding: 0 1em;
              border: 1px solid #d4d4d4;
          }
        }
      }
    }
  }

</style>
