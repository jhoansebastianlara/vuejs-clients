import Home from './components/Home.vue'
import Clients from './components/clients/Clients.vue'
import Providers from './components/providers/Providers.vue'

export const routes = [
  { name: 'Home', path: '/', component: Home },
  { name: 'Clients', path: '/clients', component: Clients },
  { name: 'Providers', path: '/providers', component: Providers }
]
