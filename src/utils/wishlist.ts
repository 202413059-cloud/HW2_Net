import type { Movie } from '@/api/movies'
import { readJSON, writeJSON } from './storage'

const KEY = 'movieWishlist'

export function getWishlist(): Movie[] {
  return readJSON<Movie[]>(KEY, [])
}

export function isWishlisted(id: number): boolean {
  return getWishlist().some(m => m.id === id)
}

export function toggleWishlist(movie: Movie): Movie[] {
  const list = getWishlist()
  const idx = list.findIndex(m => m.id === movie.id)
  if (idx === -1) list.push(movie)
  else list.splice(idx, 1)

  writeJSON(KEY, list)
  return list
}
