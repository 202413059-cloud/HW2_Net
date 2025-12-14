console.log('ENV KEY:', import.meta.env.VITE_TMDB_API_KEY)

import axios from 'axios'

const baseURL = import.meta.env.VITE_TMDB_BASE_URL

export const tmdb = axios.create({
  baseURL,
  timeout: 10000,
})

tmdb.interceptors.request.use((config) => {
  // 과제 요구: 로그인하면 localStorage의 TMDb-Key 사용 가능
  const stored = localStorage.getItem('TMDb-Key')
  const fallback = import.meta.env.VITE_TMDB_API_KEY
  const apiKey = stored || fallback

  config.params = {
    ...(config.params || {}),
    api_key: apiKey,
    language: 'ko-KR',
  }

  return config
})
