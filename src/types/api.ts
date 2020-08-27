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
  category?: string
  subCategory?: string
  page?: number
  amount?: number
  sortBy?: string
  direction?: 'asc' | 'desc'
}

export type ProductWithJjimmed = Product & { isJjimmed: boolean }

export type ProductWithJjimmedQuantity = ProductWithJjimmed & {
  quantityInCart: number
}

export type GetProductsByCategoryApiResponse =
  | Product[]
  | ProductWithJjimmed[]
  | ErrorResponse

export type GetProductsByTopicRequestQuery = {
  topic: string
}

export type GetProductsByTopicResponse =
  | Product[]
  | ProductWithJjimmed[]
  | ErrorResponse

export type ProductInCart = Cart & { product: Product }

export type ProductsInCart = ProductInCart[]

export type GetProductsInCartResponse = ProductsInCart | ErrorResponse

type FoundUser = (User & { addresses: Address[] }) | null

export type GetUserInfoApiResponse = FoundUser | ErrorResponse

export type SearchApiRequestQuery = {
  term: string
  page?: number
}

export type SearchApiResponse = Product[] | ProductWithJjimmed[] | ErrorResponse

export type SetDefaultAddressApiRequestBody = {
  defaultAddressId: number
}

export type ToggleJjimRequestBody = {
  productId: number
}

export type GetSubCategoriesApiResponse = string[] | ErrorResponse

export type PatchProductQuantityInCartApiRequestBody = {
  productId: number
  quantity: number
}

export type PatchProductQuantityInCartApiResponse = Cart | ErrorResponse

export type GetProductApiRequestQuery = {
  productId: string
}

export type GetProductApiResponse =
  | Product
  | ProductWithJjimmedQuantity
  | ErrorResponse
