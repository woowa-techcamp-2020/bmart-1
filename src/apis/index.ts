import { ERROR_MSG } from 'src/constants'

export function saveToken(token: string): void {
  localStorage.setItem('token', token)
}

// TODO REMOVE THIS AFTER LOGIN IMPLEMENTATION
saveToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcklkIjoxNSwiaWF0IjoxNTE2MjM5MDIyfQ.OYhK3YG3W7iX5JxsQuwBn1ARPKVOgzh4GDs0FVqxols'
)

function loadToken(): string {
  return localStorage.getItem('token')
}

function addToken() {
  const token = loadToken()

  if (!token) return null

  return { Authorization: `Bearer ${token}` }
}

const createQuery = (data: Record<string, string>): string => {
  return data
    ? '?' +
        Object.keys(data)
          .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
          .join('&')
    : ''
}

function addBody(body) {
  if (body === undefined) return null

  return {
    body: JSON.stringify(body),
  }
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

const defaultOptions = (method: Method, body?): RequestInit => ({
  method,
  headers: {
    'Content-Type': 'application/json',
    ...addBody(body),
    ...addToken(),
  },
})

async function request(url, method) {
  try {
    const response = await fetch('/api/' + url, defaultOptions(method))

    if (!response.ok) {
      console.error(response.status)
      throw new Error(ERROR_MSG.BAD_REQUEST)
    }

    const result = await response.json()

    return result
  } catch (e) {
    console.error(e)
    alert(e.message)
  }
}

export async function getJjims() {
  return await request('/jjims', 'GET')
}

export async function getSubCategories(category: string) {
  return await request(`/sub-categories${createQuery({ category })}`, 'GET')
}
