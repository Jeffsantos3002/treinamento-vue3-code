<template>
  <div class="px-8">
    <h1 class="font-black text-4xl text-gray-800 my-10 text-center md:text-start">Entre na sua conta</h1>
    <form @submit.prevent="handlesubimit">
      <label class="block">
        <span class="text-lg font-medium text-gray-800">E-mail</span>
        <input
          id="email-field"
          v-model="state.email.value"
          type="email"
          :class="`${state.email.errorMessage ? 'border-brand-danger border-solid' : 'border-transparent border-none'} block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 rounded focus:border-none`"

          placeholder="jef@gmail.com"
        >
        <span
          id="email-error"
          v-if="!!state.email.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.email.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">Senha</span>
        <input
          id="password-field"
          v-model="state.password.value"
          type="password"
          :class="`${state.password.errorMessage ? 'border-brand-danger border-solid' : 'border-transparent border-none'} block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 rounded focus:border-none`"

          placeholder="****"
        >
        <span
          v-if="state.password.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.password.errorMessage }}
        </span>
      </label>
      <button
        id="submit-button"
        :disabled="state.isLoading"
        type="submit"
        :class="{
          'opacity-50': state.isLoading
        }"
        class="max-w-[450px] px-12 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
      >
        <icon v-if="state.isLoading" name="loading" class="animate-spin" />
        <span v-else>Entrar</span>
      </button>
    </form>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import { checkEmail, checkPassword } from '@/utils/validators'
import services from '@/services'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import icon from '../Icon'

const toast = useToast()
const router = useRouter()
// Estado inicial usando ref
const state = ref({
  isLoading: false,
  hasError: false,
  email: {
    value: null,
    errorMessage: null
  },
  password: {
    value: null,
    errorMessage: null
  }
})

// Função para validar o email
const validateEmail = () => {
  state.value.email.errorMessage = checkEmail(state.value.email.value)
}

// Função para validar a senha
const validatePassword = () => {
  state.value.password.errorMessage = checkPassword(state.value.password.value)
}

const hasValidationErrors = () => {
  validateEmail()
  validatePassword()
  if (state.value.password.errorMessage || state.value.email.errorMessage) {
    console.log('os dois são verdadeiros: ', state.value.password.errorMessage, state.value.email.errorMessage)
    return false
  } else {
    console.log(state.value.password.errorMessage, state.value.email.errorMessage)
    return true
  }
}

const handlesubimit = async () => {
  validateEmail()
  validatePassword()

  if (!hasValidationErrors()) {
    return
  }

  try {
    toast.clear()
    state.value.isLoading = true
    const { data, errors } = await services.auth.login({
      email: state.value.email.value,
      password: state.value.password.value
    })

    if (!errors) {
      window.localStorage.setItem('token', data.token)
      router.push({ name: 'Feedbacks' })
      state.value.isLoading = false
      return
    }
    if (errors.status === 404) {
      toast.error('E-mail não encontrado')
      state.value.isLoading = false
    } if (errors.status === 401) {
      toast.error('E-mail ou senha inválidos')
      state.value.isLoading = false
    } if (errors.status === 400) {
      toast.error('Ocorreu um erro ao fazer o login')
      state.value.isLoading = false
    }
  } catch (error) {
    state.value.isLoading = false
    state.value.hasError = !!error
    toast.error('Ocorreu um erro ao fazer o login')
  }
}
</script>
