<template>
  <header :class="{ scrolled }">
    <div class="left">
      <a class="logo" @click.prevent="go('/')">MyFlix</a>
      <nav class="menu">
        <a @click.prevent="go('/')">Home</a>
        <a @click.prevent="go('/popular')">Popular</a>
        <a @click.prevent="go('/search')">Search</a>
        <a @click.prevent="go('/wishlist')">Wishlist</a>
      </nav>
    </div>

    <div class="right" v-if="email">
      <span class="user">{{ email }}</span>
      <button class="btn" @click="logout">Logout</button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const scrolled = ref(false)

const email = computed(() => {
  try {
    const auth = localStorage.getItem('auth')
    return auth ? JSON.parse(auth).email : null
  } catch {
    return null
  }
})

function go(path: string) {
  router.push(path)
}

function logout() {
  localStorage.removeItem('auth')
  router.push('/signin')
}

function onScroll() {
  scrolled.value = window.scrollY > 10
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  transition: all .25s ease;
  backdrop-filter: blur(8px);
}
header.scrolled { transform: translateY(-2px); opacity: .95; }
.left { display: flex; gap: 16px; align-items: center; }
.logo { font-weight: 800; cursor: pointer; }
.menu { display: flex; gap: 12px; }
.menu a { cursor: pointer; opacity: .85; }
.menu a:hover { opacity: 1; }
.right { display: flex; gap: 10px; align-items: center; }
.btn { cursor: pointer; }
.user { font-size: 12px; opacity: .85; max-width: 160px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* 반응형 */
@media (max-width: 600px) {
  .menu { gap: 8px; font-size: 12px; }
  .user { display: none; }
}
</style>
