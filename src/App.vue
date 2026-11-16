<script setup>
import { ref, computed } from 'vue';
import LocationSection from "./components/sections/LocationSection.vue";
import TeamSection from "./components/sections/TeamSection.vue";
import {$translate, setLanguage} from "./plugins/i18n.js";

const availableLangs = [
  { code: 'tr', label: 'Türkçe' },
  { code: 'en', label: 'English' },
  { code: 'bg', label: 'Български' },
];

const currentLang = ref('tr'); // Varsayılan dil Türkçe
const form = ref({ name: '', email: '', message: '', kvkkConsent: false });
const valid = ref(false);
const formRef = ref(null);
const snackbar = ref(false); // Alert yerine Vuetify Snackbar kullanıyoruz
const snackbarText = ref('');
const kvkkDialog = ref(false);

const processKeys = ['step1', 'step2', 'step3', 'step4'];

// Servisler dizisini i18n'den çekmek için
const serviceKeys = ['service1', 'service2', 'service3', 'service4', 'service5', 'service6'];

// WhatsApp hızlı iletişim butonu
const whatsappNumber = '905541961011';
const whatsappHref = computed(() => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent($translate('common.whatsappFloatingMessage'))}`);

// --- FONKSİYONLAR ---
// İletişim formu Web3Forms üzerinden e-postaya gönderilir (https://web3forms.com).
// Erişim anahtarı herkese açık olacak şekilde tasarlanmıştır, .env içinde tutulur.
const web3formsKey = import.meta.env.VITE_WEB3FORMS_KEY;

async function submitForm() {
  if (!valid.value) return;

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: web3formsKey,
        subject: `Web sitesi iletişim formu: ${form.value.name}`,
        from_name: 'Deliorman Danışmanlık Web Sitesi',
        name: form.value.name,
        email: form.value.email,
        message: form.value.message,
        kvkk_onayi: form.value.kvkkConsent ? 'Evet' : 'Hayır',
        botcheck: false,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.success) throw new Error(data.message || `HTTP ${res.status}`);

    snackbarText.value = $translate('contactSection.sendSuccess', { name: form.value.name });
    snackbar.value = true;
    form.value = { name: '', email: '', message: '', kvkkConsent: false };
    formRef.value?.resetValidation();
  } catch (e) {
    snackbarText.value = $translate('contactSection.sendError');
    snackbar.value = true;
  }
}

function setCurrentLang(code) {
  currentLang.value = code;
  setLanguage(code);
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>

<template>
  <v-app class="app-light-theme">
    <!-- Navbar (Beyaz zemin, Lacivert/Koyu yazı) -->
    <v-app-bar app color="white" flat class="px-md-16" elevation="2">
      <v-img src="/logo.jpg" max-height="44" max-width="44" class="mr-3" contain></v-img>
      <v-toolbar-title class="font-weight-black text-navy">DELİORMAN</v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Menü Linkleri -->
      <v-btn text class="text-dark-gray" @click="scrollToSection('services')">{{ $t('heroSection.servicesTitle') }}</v-btn>
      <v-btn text class="text-dark-gray" @click="scrollToSection('about')">{{ $t('heroSection.aboutTitle') }}</v-btn>
      <v-btn text class="text-dark-gray" @click="scrollToSection('team')">{{ $t('heroSection.teamTitle') }}</v-btn>
      <v-btn text class="text-dark-gray" @click="scrollToSection('contact')">{{ $t('heroSection.contactTitle') }}</v-btn>
      <v-btn text class="text-dark-gray" @click="scrollToSection('location')">{{ $t('locationSection.sectionTitle') }}</v-btn>

      <!-- Dil Değiştirme -->
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" variant="text" class="ml-4 text-navy">
            <v-icon start>mdi-web</v-icon>
            {{ currentLang.toUpperCase() }}
          </v-btn>
        </template>
        <v-list density="compact">
          <v-list-item
              v-for="lang in availableLangs"
              :key="lang.code"
              @click="setCurrentLang(lang.code)"
              :active="lang.code === currentLang"
          >
            <v-list-item-title>{{ lang.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <!-- 1. Hero / Kapak Bölümü (Hafif arka plan, güçlü başlık) -->
      <section id="hero" class="hero-container d-flex align-center justify-center">
        <v-container class="text-center pa-10 pa-md-16">
          <v-row justify="center">
            <v-col cols="12" md="10">
              <h1 class="display-3 font-weight-black text-navy">{{ $t('heroSection.heroTitle') }}</h1>
              <p class="subtitle-1 mt-6 mb-8 text-dark-gray font-weight-medium" style="max-width: 800px; margin: 0 auto;">{{ $t('heroSection.heroSubtitle') }}</p>
              <v-btn
                  color="navy"
                  size="large"
                  rounded
                  @click="scrollToSection('contact')"
                  class="mt-4 text-white"
              >
                {{ $t('heroSection.contactCta') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- 1.5 Süreç Bölümü (Nasıl Çalışıyoruz) -->
      <section id="process" class="py-12 py-md-16 bg-white">
        <v-container>
          <h2 class="text-center text-h4 font-weight-bold mb-10 text-navy">{{ $t('processSection.sectionTitle') }}</h2>
          <v-row dense justify="center">
            <v-col cols="12" sm="6" md="3" v-for="(key, index) in processKeys" :key="key">
              <div class="text-center px-2">
                <div class="process-step-number mx-auto mb-4">{{ index + 1 }}</div>
                <h3 class="text-h6 font-weight-bold text-navy mb-2">{{ $t(`processSection.${key}Title`) }}</h3>
                <p class="text-body-2 text-dark-gray">{{ $t(`processSection.${key}Desc`) }}</p>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- 2. Services Bölümü (Açık gri zemin üzerinde beyaz kartlar) -->
      <section id="services" class="py-12 py-md-16 bg-light-gray">
        <v-container>
          <h2 class="text-center text-h4 font-weight-bold mb-10 text-navy">{{ $t('servicesSection.sectionTitle') }}</h2>
          <v-row dense>
            <v-col cols="12" md="4" v-for="key in serviceKeys" :key="key">
              <v-card
                  elevation="5"
                  rounded="lg"
                  class="pa-4 pa-md-6 h-100 service-card"
                  color="white"
                  hover
              >
                <v-card-title class="text-h6 font-weight-bold text-navy">
                  <v-icon left color="navy" class="mr-3">mdi-check-decagram-outline</v-icon>
                  {{ $t(`servicesSection.${key}Title`) }}
                </v-card-title>
                <v-card-text class="text-body-2 text-dark-gray mt-2">{{ $t(`servicesSection.${key}Desc`) }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- 3. About Bölümü (Beyaz zemin) -->
      <section id="about" class="py-12 py-md-16 bg-white">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="8">
              <h2 class="text-center text-h4 font-weight-bold mb-6 text-navy">{{ $t('aboutSection.sectionTitle') }}</h2>
              <p class="text-center mx-auto text-body-1 text-dark-gray" style="max-width:800px">
                {{ $t('aboutSection.aboutContent') }}
              </p>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- 3.5 Ekip Bölümü (Beyaz zemin) -->
      <section id="team" class="py-12 py-md-16 bg-white">
        <v-container>
          <h2 class="text-center text-h4 font-weight-bold mb-10 text-navy">{{ $t('teamSection.sectionTitle') }}</h2>
          <TeamSection></TeamSection>
        </v-container>
      </section>

      <!-- 4. Contact Bölümü (Açık gri zemin üzerinde beyaz form) -->
      <section id="contact" class="py-12 py-md-16 bg-light-gray">
        <v-container>
          <h2 class="text-center text-h4 font-weight-bold mb-10 text-navy">{{ $t('contactSection.sectionTitle') }}</h2>
          <v-row justify="center">
            <v-col cols="12" md="6">
              <v-card elevation="8" rounded="lg" class="pa-6 pa-md-8" color="white">
                <v-form ref="formRef" v-model="valid">
                  <!-- Name Field -->
                  <v-text-field
                      v-model="form.name"
                      :rules="[v => !!v || $t('contactSection.requiredField')]"
                      :label="$t('contactSection.nameLabel')"
                      required
                      color="navy"
                      variant="outlined"
                      density="comfortable"
                      class="mb-2"
                  ></v-text-field>

                  <!-- Email Field -->
                  <v-text-field
                      v-model="form.email"
                      :rules="[v => !!v || $t('contactSection.requiredField')]"
                      :label="$t('contactSection.emailLabel')"
                      required
                      color="navy"
                      variant="outlined"
                      density="comfortable"
                      class="mb-2"
                  ></v-text-field>

                  <!-- Message Field -->
                  <v-textarea
                      v-model="form.message"
                      :rules="[v => !!v || $t('contactSection.requiredField')]"
                      :label="$t('contactSection.messageLabel')"
                      required
                      color="navy"
                      variant="outlined"
                      class="mb-4"
                  ></v-textarea>

                  <!-- KVKK Onay Kutusu -->
                  <v-checkbox
                      v-model="form.kvkkConsent"
                      :rules="[v => !!v || $t('contactSection.kvkkRequired')]"
                      color="navy"
                      density="compact"
                      hide-details="auto"
                      class="mb-4"
                  >
                    <template v-slot:label>
                      <span class="text-body-2 text-dark-gray">
                        {{ $t('contactSection.kvkkConsentText') }}
                        <a href="#" class="text-navy" @click.stop.prevent="kvkkDialog = true">{{ $t('contactSection.kvkkLinkText') }}</a>
                      </span>
                    </template>
                  </v-checkbox>

                  <!-- Submit Button -->
                  <v-btn
                      color="navy"
                      @click="submitForm"
                      :disabled="!valid"
                      size="large"
                      block
                      class="text-white"
                  >
                    {{ $t('contactSection.sendButton') }}
                  </v-btn>
                </v-form>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- 5. Location Bölümü (Beyaz zemin) -->
      <section id="location" class="py-12 py-md-16 bg-white">
        <v-container>
          <LocationSection></LocationSection>
        </v-container>
      </section>

      <!-- Footer -->
      <v-footer color="#003366" dark class="py-4">
        <v-container class="d-flex flex-column flex-sm-row align-center justify-center justify-sm-space-between">
          <span class="text-caption text-white mb-2 mb-sm-0">
            &copy; {{ new Date().getFullYear() }} Deliorman Danışmanlık. {{ $t('footerSection.rights') }}
            &nbsp;·&nbsp;
            <a href="#" class="text-white text-decoration-underline" @click.prevent="kvkkDialog = true">{{ $t('footerSection.privacyLink') }}</a>
          </span>
          <a
              href="https://www.facebook.com/deliormandanismanlik/"
              target="_blank"
              rel="noopener"
              class="text-white"
              :aria-label="$t('footerSection.facebookLabel')"
          >
            <v-icon size="24">mdi-facebook</v-icon>
          </a>
        </v-container>
      </v-footer>

    </v-main>

    <!-- WhatsApp Hızlı İletişim Butonu -->
    <a
        :href="whatsappHref"
        target="_blank"
        rel="noopener"
        class="whatsapp-fab"
        :aria-label="$t('common.whatsappFloatingLabel')"
    >
      <v-icon size="32" color="white">mdi-whatsapp</v-icon>
    </a>

    <!-- Gizlilik Politikası / KVKK Aydınlatma Metni Dialog -->
    <v-dialog v-model="kvkkDialog" max-width="700" scrollable>
      <v-card>
        <v-card-title class="text-navy font-weight-bold">{{ $t('legalSection.title') }}</v-card-title>
        <v-card-text style="white-space: pre-line; max-height: 60vh;" class="text-body-2 text-dark-gray">{{ $t('legalSection.content') }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="navy" variant="text" @click="kvkkDialog = false">{{ $t('common.close') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar (Gönderim Bildirimi) -->
    <v-snackbar
        v-model="snackbar"
        :timeout="3000"
        color="#003366"
        location="bottom right"
    >
      {{ snackbarText }}
      <template v-slot:actions>
        <v-btn
            color="white"
            variant="text"
            @click="snackbar = false"
        >
          {{ $t('common.close') }}
        </v-btn>
      </template>
    </v-snackbar>

  </v-app>
</template>

<style scoped>
  /* 🎨 Kurumsal Renkler */
.text-navy { color: #003366 !important; }
.bg-navy { background-color: #003366 !important; }
.text-dark-gray { color: #333333 !important; }
.text-medium-gray { color: #555 !important; }
.bg-light-gray { background-color: #F5F7FA !important; } /* biraz daha modern */
.bg-white { background-color: white !important; }

/* 🌐 Genel Tema */
.app-light-theme {
  background-color: #F5F7FA;
}

/* 🟦 HERO Bölümü */
.hero-container {
  min-height: 85vh;
  background: linear-gradient(135deg, #0F172A 0%, #0c4a6e 100%);
  border-bottom: 1px solid #E5E8EB;
  display: flex;
  align-items: center;
}

/* Başlık daha güçlü */
.hero-container h1 {
  color: #ffffff !important;
  font-weight: 800 !important;
}

/* Alt metin daha softer */
.hero-container p {
  color: #cbd5e1 !important;
}

/* CTA Buton */
.v-btn--hero {
  background-color: #003366 !important;
  color: white !important;
  padding: 12px 28px !important;
  font-size: 16px;
  border-radius: 30px !important;
  transition: 0.25s ease;
}
.v-btn--hero:hover {
  background-color: #00254d !important;
}

/* 🔢 Süreç Adımları */
.process-step-number {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #003366;
  color: white;
  font-weight: 800;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 🧩 Servis Kartları */
.service-card {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  border: 1px solid #DFE3E8;
  background-color: #ffffff;
  border-radius: 12px;
}
.service-card:hover {
  box-shadow: 0 6px 20px rgba(0, 51, 102, 0.1) !important;
  transform: translateY(-4px);
}

/* 💬 WhatsApp Hızlı İletişim Butonu */
.whatsapp-fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 60px;
  height: 60px;
  background-color: #25D366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  z-index: 1000;
  transition: transform 0.2s ease;
}
.whatsapp-fab:hover {
  transform: scale(1.08);
}
@media (max-width: 600px) {
  .whatsapp-fab {
    width: 52px;
    height: 52px;
    bottom: 16px;
    right: 16px;
  }
}

/* 🗺️ Harita Kartı */
.map-card iframe {
  height: 300px;
  border-radius: 10px;
}
@media (min-width: 960px) {
  .map-card iframe {
    height: 450px;
  }
}
</style>
