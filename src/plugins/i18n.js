import { createI18n } from 'vue-i18n'
import { en as vuetifyEn, tr as vuetifyTr, bg as vuetifyBg } from 'vuetify/locale'

// Load all JSON files from '../i18n/**/*.json'
const jsonModules = import.meta.glob('../i18n/**/*.json')

let languageMap = {}
let i18n = null

function getOrCreateLanguageMap(locale) {
    if (!languageMap[locale]) {
        languageMap[locale] = {}
    }
    return languageMap[locale]
}

// Helper to load all JSON files
async function loadAllJsonFiles() {
    for (const path in jsonModules) {
        const fileName = path.split('/').pop()
        const locale = fileName.split('.')[1]
        const map = getOrCreateLanguageMap(locale) // map referansı al
        const module = await jsonModules[path]()
        Object.assign(map, module.default) // languageMap içindeki objeyi güncelle
    }
    return languageMap
}

export async function createLocalization() {
    await loadAllJsonFiles()
    const { en, tr, bg } = languageMap

    // Vuetify locale ekle
    if (en) en.$vuetify = vuetifyEn
    if (tr) {
        tr.$vuetify = vuetifyTr
        tr.$vuetify.noDataText = 'Bu görünümde veri bulunmamaktadır.'
    }
    if (bg) {
        bg.$vuetify = vuetifyBg
        bg.$vuetify.noDataText = 'Няма данни за показване.'
    }

    i18n = createI18n({
        legacy: false,
        locale: 'tr',
        fallbackLocale: 'tr',
        messages: { en, tr, bg }
    })
    return i18n
}

export function $translate(key, variable) {
    return i18n.global.t(key, variable)
}

export function setLanguage(language) {
    i18n.global.locale.value = language
}
