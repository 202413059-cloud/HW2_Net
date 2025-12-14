<template>
  <div>
    <Section title="Popular" :items="popular" :loading="loading.popular" @changed="refresh" />
    <Section title="Now Playing" :items="nowPlaying" :loading="loading.nowPlaying" @changed="refresh" />
    <Section title="Top Rated" :items="topRated" :loading="loading.topRated" @changed="refresh" />
    <Section title="Upcoming" :items="upcoming" :loading="loading.upcoming" @changed="refresh" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { endpoints } from '@/api/url'
import { fetchMovies, type Movie } from '@/api/movies'
import Section from '@/pages/partials/Section.vue'

const popular = ref<Movie[]>([])
const nowPlaying = ref<Movie[]>([])
const topRated = ref<Movie[]>([])
const upcoming = ref<Movie[]>([])

const loading = reactive({
  popular: true,
  nowPlaying: true,
  topRated: true,
  upcoming: true,
})

async function load() {
  loading.popular = loading.nowPlaying = loading.topRated = loading.upcoming = true

  const p1 = fetchMovies(endpoints.popular().url, endpoints.popular().params).then(d => (popular.value = d.results)).finally(() => (loading.popular = false))
  const p2 = fetchMovies(endpoints.nowPlaying().url, endpoints.nowPlaying().params).then(d => (nowPlaying.value = d.results)).finally(() => (loading.nowPlaying = false))
  const p3 = fetchMovies(endpoints.topRated().url, endpoints.topRated().params).then(d => (topRated.value = d.results)).finally(() => (loading.topRated = false))
  const p4 = fetchMovies(endpoints.upcoming().url, endpoints.upcoming().params).then(d => (upcoming.value = d.results)).finally(() => (loading.upcoming = false))

  await Promise.all([p1, p2, p3, p4])
}

function refresh() {
  // 카드 클릭 후 즉시 반영은 MovieCard 내부 liked가 watchEffect로 처리.
  // 여기선 섹션 전체 리렌더 유도 정도만.
}

onMounted(load)
</script>
