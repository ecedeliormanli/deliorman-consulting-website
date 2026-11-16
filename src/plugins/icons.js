import { h } from 'vue'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import {
    mdiAccount,
    mdiCheckDecagramOutline,
    mdiFacebook,
    mdiMapSearchOutline,
    mdiPhone,
    mdiWeb,
    mdiWhatsapp,
} from '@mdi/js'

// Sadece sitede kullanılan ikonlar SVG olarak paketlenir (tüm ikon fontu yerine).
// Şablonlarda yeni bir "mdi-..." ikonu kullanılacaksa buraya da eklenmeli.
const iconPaths = {
    'mdi-account': mdiAccount,
    'mdi-check-decagram-outline': mdiCheckDecagramOutline,
    'mdi-facebook': mdiFacebook,
    'mdi-map-search-outline': mdiMapSearchOutline,
    'mdi-phone': mdiPhone,
    'mdi-web': mdiWeb,
    'mdi-whatsapp': mdiWhatsapp,
}

const mdiByName = {
    component: (props) => h(mdi.component, { ...props, icon: iconPaths[props.icon] ?? props.icon }),
}

export const icons = {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi: mdiByName },
}
