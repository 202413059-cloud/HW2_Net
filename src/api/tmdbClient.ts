import axios from 'axios'

export const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 10000,
})

tmdb.interceptors.request.use((config) => {
  const apiKey =
    localStorage.getItem('TMDb-Key') ||
    '843ec3cbf904e77356554b52273b8132' // ⬅️ 과제용 fallback (v3 key)

  config.params = {
    ...(config.params || {}),
    api_key: apiKey,
    language: 'ko-KR',
  }

  return config
})
