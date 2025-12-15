<template>
  <section class="section">
    <h3>{{ title }}</h3>

    <div v-if="loading" class="grid">
      <SkeletonCard v-for="n in 6" :key="n" />
    </div>

    <div v-else class="grid">
      <MovieCard
        v-for="m in items"
        :key="m.id"
        :movie="m"
        @changed="$emit('changed')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue'
import SkeletonCard from '@/components/SkeletonCard.vue'
import type { Movie } from '@/api/movies'

defineProps<{ title: string; items: Movie[]; loading: boolean }>()
defineEmits<{ (e: 'changed'): void }>()
</script>
