import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import 'animate.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css' // Importação dos ícones MDI
import Toast, { POSITION } from 'vue-toastification'
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'

window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = true

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  }
})

createApp(App).use(vuetify).use(router).use(Toast, {
  // Setting the global default position
  position: POSITION.BOTTOM_RIGHT
}
).mount('#app')
