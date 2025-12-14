<template>
  <section class="section">
    <h3>{{ title }}</h3>

    <div v-if="loading" class="loading">Loading...</div>

    <div v-else class="grid">
      <MovieCard v-for="m in items" :key="m.id" :movie="m" @changed="$emit('changed')" />
    </div>
  </section>
</template>

<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue'
import type { Movie } from '@/api/movies'

defineProps<{ title: string; items: Movie[]; loading: boolean }>()
defineEmits<{ (e: 'changed'): void }>()
</script>

<style scoped>
.section { margin-bottom: 26px; }
.grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
}
.loading { padding: 12px; opacity: .8; }

/* 반응형 */
@media (max-width: 1100px) { .grid { grid-template-columns: repeat(4, 1fr); } }
@media (max-width: 700px)  { .grid { grid-template-columns: repeat(2, 1fr); } }
</style>
