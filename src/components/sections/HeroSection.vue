<template>
  <v-container fluid class="hero-container text-center">
    <h1 class="display-2 font-weight-bold">{{ $t('heroSection.heroTitle') }}</h1>
    <p class="subtitle-1 my-4">{{ $t('heroSection.heroSubtitle') }}</p>
    <v-btn color="primary" large rounded>{{ $t('heroSection.contactTitle') }}</v-btn>
  </v-container>
</template>

<style scoped>
.hero-container {
  padding: 100px 0;
  background: linear-gradient(135deg, #1976D2, #42A5F5);
  color: white;
}
</style>