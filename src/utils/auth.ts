export function isLoggedIn(): boolean {
  const auth = localStorage.getItem('auth')
  return auth !== null
}

