
import { createApp } from 'vue'
import App from './App.vue'


import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi', // This is already the default value - only for display purposes
      },
  })

import router from './routes/routes'
import './index.css'

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.mount('#app');

//createApp(App).use(router).mount('#app')


