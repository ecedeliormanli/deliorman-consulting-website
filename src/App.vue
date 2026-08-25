<script setup>
import { ref } from 'vue';
import LocationSection from "./components/sections/LocationSection.vue";
import TeamSection from "./components/sections/TeamSection.vue";
import {$translate, setLanguage} from "./plugins/i18n.js";

const availableLangs = [
  { code: 'tr', label: 'Türkçe' },
  { code: 'en', label: 'English' },
  { code: 'bg', label: 'Български' },
];

const currentLang = ref('tr'); // Varsayılan dil Türkçe
const form = ref({ name: '', email: '', message: '' });
const valid = ref(false);
const formRef = ref(null);
const snackbar = ref(false); // Alert yerine Vuetify Snackbar kullanıyoruz
const snackbarText = ref('');

// Servisler dizisini i18n'den çekmek için
const serviceKeys = ['service1', 'service2', 'service3'];

// --- FONKSİYONLAR ---
function submitForm() {
  if (valid.value) {
    // Alert yerine Snackbar kullanıldı
    snackbarText.value = $translate('contactSection.sendSuccess', { name: form.value.name });
    snackbar.value = true;
    form.value = { name: '', email: '', message: '' };
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
        <v-container class="text-center">
          <span class="text-caption text-white">
            &copy; {{ new Date().getFullYear() }} Deliorman Danışmanlık. {{ $t('footerSection.rights') }}
          </span>
        </v-container>
      </v-footer>

    </v-main>

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
