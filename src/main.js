import { createApp } from 'vue'
import App from './App.vue'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import './plugins/validator.js'
import {useI18n} from "vue-i18n";
import {createVueI18nAdapter} from 'vuetify/locale/adapters/vue-i18n'
import {createLocalization} from "./plugins/i18n.js";

const i18n = await createLocalization()
const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                colors: {
                    primary: '#1976D2',
                    secondary: '#424242',
                    accent: '#82B1FF',
                    error: '#FF5252',
                    info: '#2196F3',
                    success: '#4CAF50',
                    warning: '#FB8C00',
                },
            },
        },
    },
    locale: {
        adapter: createVueI18nAdapter({
            i18n,
            useI18n
        }),
    }
})

const app = createApp(App);
app.use(vuetify);
app.use(i18n);
app.mount('#app')
