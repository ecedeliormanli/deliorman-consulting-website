<script setup>

</script>

<template>
  <v-container class="my-12">
    <h2 class="text-center mb-6">{{ $t('locationSection.sectionTitle') }}</h2>
    <v-row justify="center">

      <v-col cols="12" md="6">
        <v-card outlined class="pa-2 map-card">
          <v-btn
              class="directions-button"
              color="white"
              small
              target="_blank"
              :href="$t('locationSection.mapsUrl')"
          >
            {{ $t('locationSection.directionsButton') }}
          </v-btn>

          <iframe
              width="100%"
              height="450"
              style="border:0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              :src="$t('locationSection.embedSrc')"
          ></iframe>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card flat>
          <v-card-title class="headline primary--text">{{ $t('locationSection.firmName') }}</v-card-title>
          <v-card-text>
            <p><strong>{{ $t('locationSection.addressLabel') }}:</strong> {{ $t('locationSection.addressContent') }}</p>
            <p><strong>{{ $t('locationSection.phoneLabel') }}:</strong> {{ $t('locationSection.phoneContent') }}</p>
            <p><strong>{{ $t('locationSection.emailLabel') }}:</strong> {{ $t('locationSection.emailContent') }}</p>
          </v-card-text>

          <v-card-actions class="mt-4">

            <v-btn
                color="success"
                target="_blank"
                :href="`${$t('locationSection.wpHref')}`"
            >
              <v-icon left>mdi-whatsapp</v-icon>
              {{ $t('locationSection.whatsappButton') }}
            </v-btn>
<!--            :href="`http://wa.me/?text=Deliorman Danışmanlık%0AKavacık Subayevleri, Cihangir Cd. No:1 D:1, 06135 Keçiören/Ankara%0A%0Ahttps://maps.app.goo.gl/WPJnULEXQZZ6EDAG9`"-->

            <v-btn
                text
                color="primary"
                target="_blank"
                :href="$t('locationSection.mapsUrl')"
            >
              <v-icon left>mdi-map-search-outline</v-icon>
              {{ $t('locationSection.directionsButton') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.map-card {
  position: relative;
}
.directions-button {
  position: absolute !important;
  top: 20px;
  right: 15px;
  z-index: 10;
}
</style>