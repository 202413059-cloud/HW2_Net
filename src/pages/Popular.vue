<template>
  <div class="wrap">
    <div class="toolbar">
      <h2>Popular</h2>
      <div class="toggle">
        <button :class="{ active: mode==='table' }" @click="setMode('table')">Table</button>
        <button :class="{ active: mode==='infinite' }" @click="setMode('infinite')">Infinite</button>
      </div>
    </div>

    <!-- TABLE VIEW: 스크롤 불가 + Pagination -->
    <div v-if="mode==='table'" class="tableView">
      <div class="grid">
        <MovieCard v-for="m in items" :key="m.id" :movie="m" />
      </div>

      <div class="pager">
        <button :disabled="page<=1 || loading" @click="goPage(page-1)">Prev</button>
        <span>{{ page }} / {{ totalPages }}</span>
        <button :disabled="page>=totalPages || loading" @click="goPage(page+1)">Next</button>
      </div>

      <div v-if="loading" class="loadingRow">
        <SkeletonCard v-for="n in 6" :key="n" />
      </div>
    </div>

    <!-- INFINITE VIEW: 스크롤 가능 + 바닥 로드 + Top 버튼 -->
    <div v-else class="infiniteView" ref="scrollEl">
      <div class="grid">
        <MovieCard v-for="m in items" :key="m.id" :movie="m" />
      </div>

      <div v-if="loading" class="loadingRow">
        <SkeletonCard v-for="n in 6" :key="n" />
      </div>

      <!-- 바닥 감지용 센티넬 -->
      <div ref="sentinel" class="sentinel"></div>

      <button v-show="showTop" class="topBtn" @click="scrollTop">Top</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { endpoints } from '@/api/url'
import { fetchMovies, type Movie } from '@/api/movies'
import MovieCard from '@/components/MovieCard.vue'
import SkeletonCard from '@/components/SkeletonCard.vue'

const mode = ref<'table'|'infinite'>('table')
const items = ref<Movie[]>([])
const page = ref(1)
const totalPages = ref(1)
const loading = ref(false)

const scrollEl = ref<HTMLElement | null>(null)
const sentinel = ref<HTMLElement | null>(null)
const showTop = ref(false)

let io: IntersectionObserver | null = null

async function load(p: number, append: boolean) {
  loading.value = true
  try {
    const ep = endpoints.popular(p)
    const data = await fetchMovies(ep.url, ep.params)
    totalPages.value = data.total_pages
    items.value = append ? [...items.value, ...data.results] : data.results
    page.value = p
  } finally {
    loading.value = false
  }
}

function setMode(m: 'table'|'infinite') {
  mode.value = m
  // 모드 바꾸면 1페이지부터 다시 깔끔하게
  page.value = 1
  items.value = []
  load(1, false)
  setupInfiniteObserver()
}

function goPage(p: number) {
  load(p, false)
}

function setupInfiniteObserver() {
  // table 모드면 observer 제거
  if (mode.value !== 'infinite') {
    io?.disconnect()
    io = null
    return
  }

  io?.disconnect()
  if (!sentinel.value) return

  io = new IntersectionObserver(async (entries) => {
    const hit = entries[0]?.isIntersecting
    if (!hit) return
    if (loading.value) return
    if (page.value >= totalPages.value) return
    await load(page.value + 1, true)
  }, { root: scrollEl.value, threshold: 0.1 })

  io.observe(sentinel.value)
}

function onScroll() {
  const el = scrollEl.value
  if (!el) return
  showTop.value = el.scrollTop > 300
}
function scrollTop() {
  scrollEl.value?.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(async () => {
  await load(1, false)
  setupInfiniteObserver()
  scrollEl.value?.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  io?.disconnect()
  scrollEl.value?.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.wrap { padding-bottom: 16px; }
.toolbar { display:flex; justify-content:space-between; align-items:center; margin-bottom: 10px; }
.toggle { display:flex; gap: 8px; }
.toggle button.active { font-weight: 800; }

/* 공통 grid */
.grid { display:grid; grid-template-columns: repeat(6, 1fr); gap: 12px; }

/* TABLE VIEW: 스크롤 불가 조건 */
.tableView { overflow: hidden; } /* 페이지 자체 스크롤은 브라우저가 하겠지만, 내부는 스크롤 없이 한 화면 구성 */
/* Pagination */
.pager { display:flex; justify-content:center; align-items:center; gap: 12px; margin: 14px 0; }

/* Infinite View: 내부 스크롤 가능 */
.infiniteView {
  height: calc(100vh - 140px);
  overflow-y: auto;
  padding-right: 6px;
}
.loadingRow { margin-top: 10px; display:grid; grid-template-columns: repeat(6, 1fr); gap: 12px; }

.sentinel { height: 1px; }

.topBtn {
  position: sticky;
  bottom: 12px;
  margin-left: auto;
  display: block;
}

/* 반응형 */
@media (max-width: 1100px) { .grid, .loadingRow { grid-template-columns: repeat(4, 1fr); } }
@media (max-width: 700px)  { .grid, .loadingRow { grid-template-columns: repeat(2, 1fr); } }
</style>
