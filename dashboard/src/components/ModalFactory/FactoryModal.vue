<!-- FactoryModal.vue -->
<template>
  <div class="text-center">
    <button @click="showDialog
  ">
      <slot></slot>
    </button>

    <v-dialog v-model="dialog" max-width="544">
      <v-card class="pb-8 pt-2 px-2">
          <v-icon class="w-full flex items-end m-0 justify-end " icon="mdi-close" color="grey" @click="showDialog
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
