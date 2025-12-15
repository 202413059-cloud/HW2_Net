import axios from 'axios'

const baseURL = import.meta.env.VITE_TMDB_BASE_URL

export const tmdb = axios.create({
  baseURL,
  timeout: 10000,
})

tmdb.interceptors.request.use((config) => {
  // ✅ v3 API KEY 방식
  const apiKey =
    localStorage.getItem('TMDb-Key') ||
    import.meta.env.VITE_TMDB_API_KEY

  config.params = {
    ...(config.params || {}),
    api_key: apiKey,
    language: 'ko-KR',
  }

  return config
})
