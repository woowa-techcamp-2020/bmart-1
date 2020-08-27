import { ProductWithJjimmed } from 'src/types/api'

export const cacheProducts = (
  key: string,
  products: ProductWithJjimmed[],
  page?: number
): void => {
  if (!products || products.length === 0) {
    return
  }

  window.localStorage.setItem(
    `products-${key}`,
    JSON.stringify({
      products,
      page,
    })
  )
}

export const loadProductsFromCache = (
  key: string
): {
  products: ProductWithJjimmed[]
  page?: number
} => {
  return JSON.parse(window.localStorage.getItem(`products-${key}`) ?? null)
}
