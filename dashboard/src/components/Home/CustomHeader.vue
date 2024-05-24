<template>
  <header class="bg-brand-main text-white font-black h-4/5 bg-balloonBlue  md:bg-[length:520px] bg-right-bottom bg-no-repeat">
    <nav class="flex flex-row w-full justify-between">
      <img :src="logo" alt="logo">
      <div class="flex flex-row items-center space-x-6 text-lg hidden md:flex">
        <factory-modal actionName="create-account">
          <p>Crie uma conta</p>
        </factory-modal>
        <factory-modal actionName="login">
          <button class="rounded-full bg-slateblue-50 text-brand-main px-4 ">Entrar</button>
        </factory-modal>
      </div>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" class="md:hidden"></v-app-bar-nav-icon>
    </nav>
    <v-navigation-drawer
        v-model="drawer"
        location="right"
        temporary
      >
        <v-list>
          <v-list-item class="p-0">
            <factory-modal actionName="create-account">
              <p class="text-brand-main  text-2xl ">Crie uma conta</p>
            </factory-modal>
          </v-list-item>
          <v-list-item class="p-0">
            <factory-modal actionName="login">
              <button class="rounded-full bg-brand-main text-slateblue-50 px-4 text-2xl ">Entrar</button>
            </factory-modal>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

    <div class="sm:mx-10 md:mx-24 h-5/6 flex flex-col justify-center items-center md:items-start md:max-w-[548px]  md:text-start">
        <h1 class="text-5xl mb-2.5 font-mediumR">Tenha um feedback. <br> E faça seus clientes mais <br> felizes!</h1>

        <p class="text-2xl font-normal mb-5">Receba ideias, reclamações e feedbacks com um simples widget na página.</p>
        <button class="bg-slateblue-50 text-brand-main rounded-full w-[220px] text-lg py-2">Crie uma conta grátis</button>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import logo from '../../assets/dashboard/logo_white-1.svg'
import FactoryModal from '../ModalFactory/FactoryModal.vue'

const drawer = ref(false)
</script>
