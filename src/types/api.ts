import { Address, Cart, Jjim, Product, User } from '@prisma/client'

type ErrorResponse = {
  message: string
}

export type AddAddressApiRequestBody = {
  address1: string
  address2?: string
}

export type AddToCartRequestBody = {
  productId: number
  quantity: number
}

export type DeleteAddressRequestBody = {
  addressId: number
}

export type DeleteFromCartBody = {
  productIds: number[]
}

export type GetJjimsApiResponse = Jjim[] | ErrorResponse

export type GetProductsByCategoryApiRequestQuery = {
  category: string
  page?: number
  sortBy?: string
  direction?: 'asc' | 'desc'
}

export type GetProductsByCategoryApiResponse = Product[] | ErrorResponse

export type GetProductsByTopicRequestQuery = {
  topic: string
}

type ProductsInCart = (Cart & {
  product: Product
})[]

export type GetProductsInCartResponse = ProductsInCart | ErrorResponse

type FoundUser = (User & { addresses: Address[] }) | null

export type GetUserInfoApiResponse = FoundUser | ErrorResponse

export type SearchApiRequestQuery = {
  term: string
}

export type SearchApiResponse = Product[] | ErrorResponse

export type SetDefaultAddressApiRequestBody = {
  defaultAddressId: number
}

export type ToggleJjimRequestBody = {
  productId: number
}

export type GetSubCategoriesApiResponse = string[] | ErrorResponse
