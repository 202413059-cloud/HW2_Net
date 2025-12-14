<template>
  <div class="card" :class="{ liked }" @click="toggle">
    <img v-if="posterUrl" :src="posterUrl" :alt="movie.title" />
    <div v-else class="noimg">No Image</div>
    <div class="meta">
      <h4>{{ movie.title }}</h4>
      <p class="overview">{{ movie.overview }}</p>
    </div>
    <span class="badge" v-if="liked">★</span>
  </div>
</template>

<script setup lang="ts">
import type { Movie } from '@/api/movies'
import { computed, ref, watchEffect } from 'vue'
import { isWishlisted, toggleWishlist } from '@/utils/wishlist'

const props = defineProps<{ movie: Movie }>()
const emit = defineEmits<{ (e: 'changed'): void }>()

const liked = ref(false)

watchEffect(() => {
  liked.value = isWishlisted(props.movie.id)
})

const posterUrl = computed(() => {
  if (!props.movie.poster_path) return ''
  const base = import.meta.env.VITE_TMDB_IMG
  return `${base}/w342${props.movie.poster_path}`
})

function toggle() {
  toggleWishlist(props.movie)
  emit('changed')
}
</script>

<style scoped>
.card {
  position: relative;
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  transition: transform .18s ease;
}
.card:hover { transform: scale(1.04); }
.card.liked { outline: 2px solid rgba(255,255,255,.7); }

img { width: 100%; display: block; }
.noimg { height: 220px; display:flex; align-items:center; justify-content:center; opacity:.6; }

.meta { padding: 10px; }
.overview { font-size: 12px; opacity: .8; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

.badge {
  position: absolute; top: 8px; right: 8px;
  background: rgba(0,0,0,.6);
  padding: 4px 8px;
  border-radius: 999px;
}
</style>
