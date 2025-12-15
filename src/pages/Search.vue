<template>
  <div class="wrap">
    <div class="toolbar">
      <h2>Search / Filter</h2>
      <button @click="reset" :disabled="loading">초기화</button>
    </div>

    <div class="filters">
      <label>
        장르
        <select v-model="genreId">
          <option value="">전체</option>
          <option v-for="g in genres" :key="g.id" :value="String(g.id)">{{ g.name }}</option>
        </select>
      </label>

      <label>
        최소 평점
        <select v-model.number="minVote">
          <option :value="0">0+</option>
          <option :value="5">5+</option>
          <option :value="7">7+</option>
          <option :value="8">8+</option>
        </select>
      </label>

      <label>
        개봉년도
        <input v-model="year" placeholder="예: 2024" inputmode="numeric" />
      </label>

      <label>
        정렬
        <select v-model="sortBy">
          <option value="popularity.desc">인기순</option>
          <option value="vote_average.desc">평점순</option>
          <option value="primary_release_date.desc">최신순</option>
        </select>
      </label>

      <button @click="apply" :disabled="loading">필터 적용</button>
    </div>

    <div v-if="loading" class="grid">
      <SkeletonCard v-for="n in 12" :key="n" />
    </div>

    <div v-else class="grid">
      <MovieCard v-for="m in items" :key="m.id" :movie="m" />
    </div>

    <div class="pager">
      <button :disabled="page<=1 || loading" @click="go(page-1)">Prev</button>
      <span>{{ page }} / {{ totalPages }}</span>
      <button :disabled="page>=totalPages || loading" @click="go(page+1)">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { endpoints } from '@/api/url'
import { fetchMovies, type Movie } from '@/api/movies'
import { tmdb } from '@/api/tmdbClient'
import MovieCard from '@/components/MovieCard.vue'
import SkeletonCard from '@/components/SkeletonCard.vue'

type Genre = { id: number; name: string }

const genres = ref<Genre[]>([])
const items = ref<Movie[]>([])
const loading = ref(false)

const genreId = ref<string>('')          // 장르
const minVote = ref<number>(0)           // 최소 평점
const year = ref<string>('')             // 개봉년도
const sortBy = ref<string>('popularity.desc') // 정렬

const page = ref(1)
const totalPages = ref(1)

async function loadGenres() {
  const ep = endpoints.genres()
  const res = await tmdb.get(ep.url, { params: ep.params })
  genres.value = res.data.genres
}

function buildParams(p: number) {
  const params: Record<string, any> = { page: p, sort_by: sortBy.value }
  if (genreId.value) params.with_genres = genreId.value
  if (minVote.value > 0) params['vote_average.gte'] = minVote.value
  if (year.value.trim()) params.primary_release_year = year.value.trim()
  return params
}

async function fetch(p: number) {
  loading.value = true
  try {
    const ep = endpoints.discover(buildParams(p))
    const data = await fetchMovies(ep.url, ep.params)
    items.value = data.results
    totalPages.value = data.total_pages
    page.value = p
  } finally {
    loading.value = false
  }
}

function apply() {
  fetch(1)
}

function reset() {
  genreId.value = ''
  minVote.value = 0
  year.value = ''
  sortBy.value = 'popularity.desc'
  fetch(1)
}

function go(p: number) {
  fetch(p)
}

onMounted(async () => {
  await loadGenres()
  await fetch(1)
})
</script>

<style scoped>
.toolbar { display:flex; justify-content:space-between; align-items:center; margin-bottom: 10px; }
.filters {
  display:flex; flex-wrap:wrap; gap: 10px;
  align-items:flex-end;
  margin-bottom: 12px;
}
.filters label { display:flex; flex-direction:column; gap: 6px; font-size: 12px; opacity:.9; }
.filters input, .filters select { padding: 8px; border-radius: 8px; }

.grid { display:grid; grid-template-columns: repeat(6, 1fr); gap: 12px; }
.pager { display:flex; justify-content:center; gap: 12px; margin-top: 14px; }

/* 반응형 */
@media (max-width: 1100px) { .grid { grid-template-columns: repeat(4, 1fr); } }
@media (max-width: 700px)  { .grid { grid-template-columns: repeat(2, 1fr); } }
</style>
