<template>
  <div>
    <div class="table-head">
      <h1>Clients</h1>
      <button type="button" @click="newClient">New Client</button>
    </div>
    <div class="table-content">
      <table>
        <thead>
          <tr>
            <th v-for="prop in tableProps"
              :style="{width: prop.width + '%'}">{{ prop.name }}</th>
          </tr>
        </thead>
        <tbody>
          <row-client v-for="client in clients"
            :client="client"
            @onEditClient="editClient"></row-client>
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
  import Client from './Client.vue'
  import ClientFormModal from './ClientFormModal.vue'

  export default {
    data() {
      return {
        tableProps: [
          { name: 'Name', width: 25 },
          { name: 'Email', width: 25 },
          { name: 'Phone', width: 15 },
          { name: 'Providers', width: 25 },
          { name: 'Options', width: 10 }
        ],
        showClientFormModal: false,
        // used when a client is going to edit
        clientEdit: {}
      }
    },
    methods:{
      editClient(client) {
        this.clientEdit = client
        this.showClientFormModal = true
      },
      newClient() {
        this.clientEdit = {}
        this.showClientFormModal = true
      }
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
    justify-content: space-between;
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
