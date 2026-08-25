<script setup>
// Fotoğraf, telefon ve unvan bilgileri geldikçe buradaki listeye
// yeni üyeler eklenip 'photo' alanına /team/<dosya-adı>.jpg yolu verilecek.
const teamKeys = ['member1'];

const teamPhotos = {
  member1: '',
};
</script>

<template>
  <v-row justify="center" dense>
    <v-col cols="12" sm="6" md="4" v-for="key in teamKeys" :key="key">
      <v-card elevation="4" rounded="lg" class="pa-6 text-center h-100 team-card" color="white">
        <v-avatar size="120" class="mb-4 team-avatar" color="#F5F7FA">
          <v-img v-if="teamPhotos[key]" :src="teamPhotos[key]" :alt="$t(`teamSection.${key}Name`)" cover></v-img>
          <v-icon v-else size="64" color="#9BA2AA">mdi-account</v-icon>
        </v-avatar>
        <h3 class="text-h6 font-weight-bold text-navy">{{ $t(`teamSection.${key}Name`) }}</h3>
        <p class="text-body-2 text-dark-gray mb-3">{{ $t(`teamSection.${key}Title`) }}</p>
        <a :href="'tel:' + $t(`teamSection.${key}Phone`)" class="text-decoration-none d-inline-flex align-center">
          <v-icon size="16" color="navy" class="mr-1">mdi-phone</v-icon>
          <span class="text-body-2 text-navy">{{ $t(`teamSection.${key}Phone`) }}</span>
        </a>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.text-navy { color: #003366 !important; }
.text-dark-gray { color: #333333 !important; }

.team-card {
  border: 1px solid #DFE3E8;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.team-card:hover {
  box-shadow: 0 6px 20px rgba(0, 51, 102, 0.1);
  transform: translateY(-4px);
}
.team-avatar {
  margin-left: auto;
  margin-right: auto;
  border: 3px solid #F5F7FA;
}
</style>
