import { baseUrl } from '@/models/auth'

export const useUnsecuredFetch = <T>(url: string, body: T, method = 'POST') => {
  console.log(body)
  return fetch(baseUrl + url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}
