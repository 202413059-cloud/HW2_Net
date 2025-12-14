import axios from 'axios'

const baseURL = import.meta.env.VITE_TMDB_BASE_URL

export const tmdb = axios.create({
  baseURL,
  timeout: 10000,
})

tmdb.interceptors.request.use((config) => {
  // ✅ TMDB v4 Read Access Token
  const token =
    localStorage.getItem('TMDb-Key') || import.meta.env.VITE_TMDB_API_KEY

  config.headers = {
    ...(config.headers || {}),
    Authorization: `Bearer ${token}`,
  }

  config.params = {
    ...(config.params || {}),
    language: 'ko-KR',
  }

  return config
})
