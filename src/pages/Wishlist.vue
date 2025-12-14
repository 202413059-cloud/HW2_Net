<template>
  <div>
    <h2>My Wishlist</h2>

    <p v-if="items.length === 0" class="empty">아직 찜한 영화가 없습니다.</p>

    <div class="grid" v-else>
      <MovieCard v-for="m in items" :key="m.id" :movie="m" @changed="reload" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MovieCard from '@/components/MovieCard.vue'
import { getWishlist } from '@/utils/wishlist'
import type { Movie } from '@/api/movies'

const items = ref<Movie[]>([])

function reload() {
  items.value = getWishlist()
}

onMounted(reload)
</script>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; }
.empty { opacity: .8; padding: 10px 0; }

@media (max-width: 1100px) { .grid { grid-template-columns: repeat(4, 1fr); } }
@media (max-width: 700px)  { .grid { grid-template-columns: repeat(2, 1fr); } }
</style>
