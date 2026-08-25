<script setup>
import { ref } from 'vue'

const form = ref({ name: '', email: '', message: '' })
const valid = ref(false)
const formRef = ref(null) // Form referansı

function submitForm() {
  // Bu fonksiyonun içindeki alert mesajları da dil dosyalarına çekilerek çevrilebilir,
  // ancak şimdilik yapıyı koruyoruz.
  if (valid.value) {
    alert(`Message sent!\nName: ${form.value.name}\nEmail: ${form.value.email}\nMessage: ${form.value.message}`)
    form.value = { name: '', email: '', message: '' }
  }
}
</script>

<template>
  <v-container class="my-12">
    <h2 class="text-center mb-6">{{ $t('contactSection.sectionTitle') }}</h2>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-form ref="formRef" v-model="valid">

          <v-text-field
              v-model="form.name"
              :rules="[v => !!v || $t('contactSection.requiredField')]"
              :label="$t('contactSection.nameLabel')"
              required
          ></v-text-field>

          <v-text-field
              v-model="form.email"
              :rules="[v => !!v || $t('contactSection.requiredField')]"
              :label="$t('contactSection.emailLabel')"
              required
          ></v-text-field>

          <v-textarea
              v-model="form.message"
              :rules="[v => !!v || $t('contactSection.requiredField')]"
              :label="$t('contactSection.messageLabel')"
              required
          ></v-textarea>

          <v-btn color="primary" @click="submitForm" :disabled="!valid">
            {{ $t('contactSection.sendButton') }}
          </v-btn>

        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>