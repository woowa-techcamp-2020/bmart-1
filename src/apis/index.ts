import { Jjim, Product, User } from '@prisma/client'
import type {
  AddToCartRequestBody,
  DeleteFromCartBody,
  GetProductsByTopicResponse,
  GetProductsInCartResponse,
  ProductsInCart,
  ProductWithJjimmed,
  SearchApiRequestQuery,
  ToggleJjimRequestBody,
} from 'src/types/api'
import { isDev } from 'src/utils'
import { PatchProductQuantityInCartApiRequestBody } from './../types/api'

const baseURL = isDev ? `http://${window.location.hostname}:13100/api` : `/api`

function loadToken(): string {
  return localStorage.getItem('token')
}

function addToken() {
  const token = loadToken()

  if (!token) return null

  return { Authorization: `Bearer ${token}` }
}

export const createQuery = (data: Record<string, string>): string => {
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

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

const defaultOptions = (method: Method, body?): RequestInit => ({
  method,
  headers: {
    'Content-Type': 'application/json',
    ...addToken(),
  },
  ...addBody(body),
})

export async function request(
  url: string,
  method: Method,
  body?: Record<string, unknown>
): Promise<any> {
  try {
    const response = await fetch(baseURL + url, defaultOptions(method, body))

    if (!response.ok) {
      console.error(response.status)

      throw new Error((await response.json()).message)
    }

    const result = await response.json().catch(() => {
      console.log()
    })

    return result
  } catch (e) {
    console.error(e)
    alert(e.message)
  }
}

export async function getJjims(): Promise<Jjim[]> {
  return await request('/jjims', 'GET')
}

export async function toggleJjim(body: ToggleJjimRequestBody) {
  return await request('/jjim', 'PUT', body)
}

export async function getSubCategories(category: string) {
  return await request(`/sub-categories${createQuery({ category })}`, 'GET')
}

export async function deleteFromCart(body: DeleteFromCartBody): Promise<void> {
  await request('/delete-from-cart', 'DELETE', body)
}

export async function getProductsInCart(): Promise<GetProductsInCartResponse> {
  return await request('/products-in-cart', 'GET')
}

export async function getProductsByTopic(
  topic: 'new' | 'now'
): Promise<GetProductsByTopicResponse> {
  return await request(`/products-by-topic?topic=${topic}`, 'GET')

export async function search(
  query: SearchApiRequestQuery
): Promise<Product[] | ProductWithJjimmed[]> {
  return await request(`/search?term=${query.term}&page=${query.page}`, 'GET')
}

export async function PatchProductQuantityInCart(
  body: PatchProductQuantityInCartApiRequestBody
): Promise<void> {
  await request('/product-quantity-in-cart', 'PATCH', body)
}

export async function addToCart(body: AddToCartRequestBody) {
  return await request('/add-to-cart', 'POST', body)
}
  
export async function getUser(): Promise<User> {
  return await request('/me', 'GET')
}
