import { jwtDecode } from 'jwt-decode'

export interface Auth {
  email: string
  password: string
}

export const baseUrl = 'http://localhost:3333'

export const isAuthenticated = () => {
  const token = localStorage.getItem('token')
  if (token == null || !token) {
    return false
  }

  try {
    const decoded = jwtDecode(token)

    if (!decoded || !decoded.exp) {
      return false
    }

    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('token')
      return false
    }
  } catch (e) {
    console.error(e)
    return false
  }

  return true
}
