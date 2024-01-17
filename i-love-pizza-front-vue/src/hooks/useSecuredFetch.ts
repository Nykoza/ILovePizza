import { baseUrl } from '@/models/auth'

export const usePostSecuredFetch = <T>(url: string, body: T) => {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No token found')
  }

  return fetch(baseUrl + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify(body)
  })
}

export const useGetSecuredFetch = <T>(url: string) => {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No token found')
  }

  return fetch(baseUrl + url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
}
