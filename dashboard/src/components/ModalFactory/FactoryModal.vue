<!-- FactoryModal.vue -->
<template>
  <div class="text-center pa-4">
    <button @click="showDialog
  ">
      <slot></slot>
    </button>

    <v-dialog v-model="dialog" width="auto">
      <v-card max-width="400">
          <v-icon class="flex absolute right-0 top-8" icon="mdi-close" color="grey" @click="showDialog
        " end></v-icon>
        <component :is="modalComponent" />
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue'
import ModalLogin from './ModalLogin.vue'
import ModalCreateAccount from './ModalCreateAccount.vue'

const dialog = ref(false)
// const title = ref('')
const props = defineProps({
  actionName: {
    type: String,
    required: true
  }
})

const modalComponent = computed(() => {
  switch (props.actionName) {
    case 'login':
      // title.value = 'Acesse Agora'
      return ModalLogin
    case 'create-account':
      // title.value = 'Crie uma conta'
      return ModalCreateAccount
    default:
      console.warn(`Action "${props.actionName}" not found`)
      return null
  }
})

const showDialog = () => {
  if (modalComponent.value) {
    dialog.value = !dialog.value
  }
}
</script>
