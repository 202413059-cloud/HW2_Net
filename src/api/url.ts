export const endpoints = {
  popular: (page = 1) => ({ url: '/movie/popular', params: { page } }),
  nowPlaying: (page = 1) => ({ url: '/movie/now_playing', params: { page } }),
  topRated: (page = 1) => ({ url: '/movie/top_rated', params: { page } }),
  upcoming: (page = 1) => ({ url: '/movie/upcoming', params: { page } }),
  genres: () => ({ url: '/genre/movie/list', params: {} }),
  discover: (params: Record<string, any>) => ({ url: '/discover/movie', params }),
}
