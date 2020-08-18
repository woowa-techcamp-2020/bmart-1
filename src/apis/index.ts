import { ERROR_MSG } from 'src/constants'
import type { GetJjimsApiResponse } from 'src/server/api/get-jjims'
import { ToggleJjimRequestBody } from 'src/server/api/toggle-jjim'

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
    ...addToken(),
  },
  ...addBody(body),
})

async function request(
  url: string,
  method: Method,
  body?: Record<string, unknown>
): Promise<unknown> {
  try {
    const response = await fetch(`/api${url}`, defaultOptions(method, body))

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

export async function getJjims(): Promise<GetJjimsApiResponse> {
  return await request('/jjims', 'GET')
}

export async function toggleJjim(body: ToggleJjimRequestBody) {
  return await request('/jjim', 'PUT', body)
}
