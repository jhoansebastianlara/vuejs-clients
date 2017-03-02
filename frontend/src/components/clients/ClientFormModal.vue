<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper row">
        <div class="modal-container col-xs-10 col-sm-8 col-md-6">
          <div class="modal-header">
            <h4>{{ modalTitle }}</h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="row">
                <div class="col-xs-offset-1 col-xs-10">
                  <div class="row">
                    <div class="col-xs-3">
                      <label for="name">Name:</label>
                    </div>
                    <div class="col-xs-9">
                      <input type="text"
                          id="name"
                          maxlength="100"
                          v-model.trim="name">
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xs-3">
                      <label for="email">Email:</label>
                    </div>
                    <div class="col-xs-9">
                      <input type="text"
                          id="email"
                          maxlength="254"
                          v-model.trim="email">
                      <div class="error-message" v-if="!isEmailValid && email">
                        Please enter a valid email
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xs-3">
                      <label for="phone">Phone:</label>
                    </div>
                    <div class="col-xs-9">
                      <input type="text"
                          id="phone"
                          v-model.trim="phone">
                    </div>
                  </div>
                  <!-- providers -->
                  <providers-crud></providers-crud>
                </div>
              </div>
            </form>
          </div>

          <div class="modal-footer">
            <button @click="$emit('close')">
              Cancel
            </button>
            <button @click="saveClient"
                :disabled="loading || !isFormValid">
              {{ buttonSaveTitle }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import * as types from '../../store/types'
  import { eventBus } from '../../main'
  import { appMixin } from '../../mixins'
  import { mapActions } from 'vuex'
  import ProvidersCrud from '../providers/providersCrud/ProvidersCrud.vue'

  export default {
    props: ['client'],
    data() {
        return {
          // Indicate whether an async action is in currently executing
          loading: false,
          clientId: null,
          name: '',
          email: '',
          phone: '',
          // checked providers
          providers: []
        }
    },
    mixins: [appMixin],
    computed: {
      isEmailValid() {
        return this.validateEmail(this.email)
      },
      buttonSaveTitle() {
        return this.loading ? 'Saving...' : (this.clientId ? 'Edit Client' : 'Add Client')
      },
      modalTitle() {
        return this.clientId ? 'Edit Client' : 'New Client'
      },
      // it checks if all required inputs in the form are filled and valid
      isFormValid() {
        let inputsFilled = this.name != '' && this.email != '' && this.phone != ''
        return inputsFilled && this.isEmailValid
      }
    },
    methods: {
      ...mapActions({
        addClient: types.ADD_CLIENT,
        updateClient: types.UPDATE_CLIENT
      }),
      saveClient() {
        this.loading = true
        let client = {
          id: this.clientId,
          name: this.name,
          email: this.email,
          phone: this.phone,
          providers: this.providers
        }

        // It is verified if the client must be updated or created
        if (this.clientId) {
          this.updateClient(client).then((response) => {
            if (!response.success) {
              alert('Something was wrong')
            }

            this.loading = false
            this.$emit('close')
          })
        } else {
          this.addClient(client).then((response) => {
            if (!response.success) {
              alert('Something was wrong')
            }

            this.loading = false
            this.$emit('close')
          })
        }
      },
      closeModal() {
        this.$emit('close')
      }
    },
    components: {
      ProvidersCrud
    },
    mounted() {
      console.log('created')
      // it checks if exist a client for edit
      if (this.client && this.client.id) {
        console.log('edit client', this.client)
        this.clientId = this.client.id
        this.name = this.client.name
        this.email = this.client.email
        this.phone = this.client.phone
        if (this.client.providers && Array.isArray(this.client.providers)) {
          this.providers = this.client.providers.map(provider => {return provider.id})
        }

        if (Array.isArray(this.providers) && this.providers.length > 0) {
          eventBus.$emit('updateSelectedProviders', this.providers)
        }
      }
    },
    created() {
      eventBus.$on('newSelectedProviders', (providersSelected) => {
        this.providers = providersSelected
      })
      // listen when a provider was toggled and update the checked providers
      eventBus.$on('providerToggle', (provider, checked) => {
        let indexProvider = this.providers.findIndex(element => element.id == provider.id)
        console.log(provider.name + ' ' + checked + ' ' + indexProvider)
        // it checks if the provider was found and is unchecked (it means remove it)
        if (indexProvider > -1 && !checked) {
          this.providers.splice(indexProvider, 1)
        } else {
          this.providers.push(provider)
        }
      })
    }
  }
</script>

<style lang="scss">
  @import "../../sass/app.scss";

  .disabled-button {

  }

  .no-padding-right {
    padding-right: 0;
  }

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .modal-container {
    background-color: #fff;
    border-radius: .25em;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    padding: 0;
  }

  .modal-header {
    display: flex;
    align-items: center;
    height: 2.5em;
    border-bottom: 1px solid lightgray;
    padding: 0 1em;

    h4 {
      margin: 0;
      color: color(primary);
    }
  }

  .modal-body {
    margin: 1em 0;

    .row:first-child {
      align-items: center;
    }

    .full-button-container {
      justify-content: center;
      align-items: center;
      display: flex;
      padding: 0;

      .full-button {
        width: 100%;
        margin-left: .4em;
      }
    }
  }

  .modal-footer {
    height: 2.5em;
    border-top: 1px solid lightgray;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 .5em;

    button {
      margin-left: .2em;
    }
  }

  /*
  * The following styles are auto-applied to elements with
  * transition="modal" when their visibility is toggled
  * by Vue.js.
  */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
