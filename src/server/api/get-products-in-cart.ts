import express, { Request, Response } from 'express'
import { prisma } from '../utils/prisma'
import { Product, Cart } from '@prisma/client'
import { STATUS_CODE, ERROR_MSG } from '~/../constants'
import { ErrorResponse } from '~/types/res'

const getProductsInCartRouter = express.Router()

type ProductsInCart = (Cart & {
  product: Product
})[]

export type GetProductsInCartResponse = ProductsInCart | ErrorResponse

getProductsInCartRouter.get(
  '/products-in-cart',
  async (req: Request, res: Response<GetProductsInCartResponse>) => {
    const userId = req.auth?.userId as number

    try {
      const productsInCart = await prisma.cart.findMany({
        where: { userId },
        include: { product: true },
      })

      res.json(productsInCart)
    } catch (err) {
      res.status(STATUS_CODE.INTERNAL_ERROR).send({ message: ERROR_MSG.INTERNAL_ERROR })
    }
  }
)

export { getProductsInCartRouter }
