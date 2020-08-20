import express, { Request, Response } from 'express'
import { ERROR_MSG, STATUS_CODE } from '~/../constants'
import { GetProductsInCartResponse } from '~/../types/api'
import { prisma } from '../utils/prisma'

const getProductsInCartRouter = express.Router()

getProductsInCartRouter.get(
  '/products-in-cart',
  async (req: Request, res: Response<GetProductsInCartResponse>) => {
    const userId = req.auth?.userId

    try {
      const productsInCart = await prisma.cart.findMany({
        where: { userId },
        include: { product: true },
        orderBy: { addedAt: 'desc' },
      })

      res.json(productsInCart)
    } catch (e) {
      console.error(e)

      res.status(STATUS_CODE.INTERNAL_ERROR).send({ message: ERROR_MSG.INTERNAL_ERROR })
    }
  }
)

export { getProductsInCartRouter }
