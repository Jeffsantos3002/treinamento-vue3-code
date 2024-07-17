<template>
  <div class="px-8">
    <h1 class="font-black text-4xl text-gray-800 my-10 text-center md:text-start">Crie uma conta</h1>
    <form @submit.prevent="handlesubmit">
      <label class="block">
        <span class="text-lg font-medium text-gray-800">Nome</span>
        <input
          id="name-field"
          v-model="state.name.value"
          @input="validateName"
          @blur="validateName"
          type="text"
          :class="`${state.name.errorMessage ? 'border-brand-danger border-solid' : 'border-transparent border-none'} block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 rounded focus:border-none`"
          placeholder="Jeferson Santos"
        >
        <span
          id="name-error"
          v-if="!!state.name.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.name.errorMessage }}
        </span>
      </label>

      <label class="block">
        <span class="text-lg font-medium text-gray-800">E-mail</span>
        <input
          id="email-field"
          v-model="state.email.value"
          @input="validateEmail"
          @blur="validateEmail"
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
          @input="validatePassword"
          @blur="validatePassword"
          type="password"
          :class="`${state.password.errorMessage ? 'border-brand-danger border-solid' : 'border-transparent border-none'} block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 rounded focus:border-none`"
          placeholder="****"
        >
        <span
          v-if="!!state.password.errorMessage"
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
        <span v-else>Criar</span>
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
  name: {
    value: '',
    errorMessage: null
  },
  email: {
    value: '',
    errorMessage: null
  },
  password: {
    value: '',
    errorMessage: null
  }
})

// Função para validar o nome
const validateName = () => {
  state.value.name.errorMessage = checkPassword(state.value.name.value)
}

// Função para validar o email
const validateEmail = () => {
  state.value.email.errorMessage = checkEmail(state.value.email.value)
}

// Função para validar a senha
const validatePassword = () => {
  state.value.password.errorMessage = checkPassword(state.value.password.value)
}

const hasValidationErrors = () => {
  validateName()
  validateEmail()
  validatePassword()
  return state.value.name.errorMessage || state.value.email.errorMessage || state.value.password.errorMessage
}
const login = async ({ email, password }) => {
  const { data, errors } = await services.auth.login({ email, password })

  if (!errors) {
    window.localStorage.setItem('token', data.token)
    router.push({ name: 'Feedbacks' })
  }
  state.value.isLoading = false
}

const handlesubmit = async () => {
  if (hasValidationErrors()) {
    return
  }

  try {
    toast.clear()
    state.value.isLoading = true
    const { errors } = await services.auth.register({
      name: state.value.name.value,
      email: state.value.email.value,
      password: state.value.password.value
    })

    if (!errors) {
      await login({
        email: state.value.email.value,
        password: state.value.password.value
      })
      return
    }
    if (errors.status === 400) {
      toast.error('Ocorreu um erro ao criar a conta')
      state.value.isLoading = false
    }
  } catch (error) {
    state.value.isLoading = false
    state.value.hasError = !!error
    toast.error('Ocorreu um erro ao criar a conta')
  }
}
</script>
