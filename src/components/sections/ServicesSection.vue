<script setup>

const servicesKeys = [
  'service1',
  'service2',
  'service3'
];
</script>

<template>
  <v-container class="my-12">
    <h2 class="text-center mb-6">{{ $t('servicesSection.section Title') }}</h2>
    <v-row dense>
      <v-col cols="12" md="4" v-for="key in servicesKeys" :key="key">
        <v-card outlined>
          <v-card-title>{{ $t(`servicesSection.${key}Title`) }}</v-card-title>
          <v-card-text>{{ $t(`servicesSection.${key}Desc`) }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>