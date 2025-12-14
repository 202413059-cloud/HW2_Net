<template>
  <Header v-if="$route.path !== '/signin'" />
  <main class="container">
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>

<style>
.container { padding: 16px; }
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
