import { tmdb } from './tmdbClient'

export type Movie = {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average?: number
  release_date?: string
}

export async function fetchMovies(url: string, params?: Record<string, any>) {
  const res = await tmdb.get(url, { params })
  return res.data as { page: number; results: Movie[]; total_pages: number }
}
