import { Jjim, Product } from '@prisma/client'
import type {
  AddAddressApiRequestBody,
  AddToCartRequestBody,
  DeleteAddressRequestBody,
  DeleteFromCartBody,
  EditAddressApiRequestBody,
  FoundUser,
  GetProductApiRequestQuery,
  GetProductsByCategoryApiRequestQuery,
  GetProductsByTopicResponse,
  GetProductsInCartResponse,
  ProductWithJjimmed,
  SearchApiRequestQuery,
  SetDefaultAddressApiRequestBody,
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
}

export async function search(
  query: SearchApiRequestQuery
): Promise<Product[] | ProductWithJjimmed[]> {
  return await request(`/search?term=${query.term}&page=${query.page}`, 'GET')
}

export async function getProductsByCategory(
  query: GetProductsByCategoryApiRequestQuery
): Promise<Product[] | ProductWithJjimmed[]> {
  const { category, page, sortBy, direction } = query

  return await request(
    `/products-by-category${createQuery({
      category,
      page: page.toString(),
      sortBy,
      direction,
    })}`,
    'GET'
  )
}

export async function getProductsBySubCategory(
  query: GetProductsByCategoryApiRequestQuery
): Promise<Product[] | ProductWithJjimmed[]> {
  const { subCategory, page, sortBy, direction } = query

  return await request(
    `/products-by-category${createQuery({
      subCategory,
      page: page.toString(),
      sortBy,
      direction,
    })}`,
    'GET'
  )
}

export async function PatchProductQuantityInCart(
  body: PatchProductQuantityInCartApiRequestBody
): Promise<void> {
  await request('/product-quantity-in-cart', 'PATCH', body)
}

export async function addToCart(body: AddToCartRequestBody) {
  return await request('/add-to-cart', 'POST', body)
}

export async function getUser(): Promise<FoundUser> {
  return await request('/me', 'GET')
}

export async function getProduct(query: GetProductApiRequestQuery) {
  return await request(`/product?productId=${query.productId}`, 'GET')
}

export async function getJJims() {
  return await request('/jjims', 'GET')
}

export async function setDefaultAddressId(
  body: SetDefaultAddressApiRequestBody
) {
  return await request('/set-default-address', 'PATCH', body)
}

export async function addAddress(body: AddAddressApiRequestBody) {
  return await request('/add-address', 'POST', body)
}

export async function deleteAddress(body: DeleteAddressRequestBody) {
  return await request('/delete-address', 'DELETE', body)
}

export async function editAddress(body: EditAddressApiRequestBody) {
  return await request('/edit-address', 'PUT', body)
}
