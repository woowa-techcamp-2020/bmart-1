import { CartCreateInput, CartUpdateInput } from '@prisma/client'
import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { STATUS_CODE, ERROR_MSG, CONSTRAINT } from '~/../constants'
import { requestValidator } from '~/middlewares'
import { prisma } from '../utils/prisma'

type AddToCartBodyRequest = {
  productId: number
  quantity: number
}

const addToCartRouter = express.Router()

addToCartRouter.post(
  '/add-to-cart',
  [body('productId').isInt(), body('quantity').isInt({ min: CONSTRAINT.MIN_QUANTITY })],
  requestValidator(),
  async (req: Request<{}, {}, AddToCartBodyRequest>, res: Response) => {
    const userId = req.auth?.userId as number
    const { productId, quantity } = req.body

    try {
      const product = await prisma.product.findOne({
        where: {
          id: productId,
        },
      })
      if (!product) throw new Error(ERROR_MSG.NO_PRODUCT)

      const query: CartCreateInput | CartUpdateInput = {
        user: {
          connect: {
            id: userId,
          },
        },
        product: {
          connect: {
            id: productId,
          },
        },
        quantity,
      }
      await prisma.cart.upsert({
        create: query as CartCreateInput,
        update: query as CartUpdateInput,
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
      })
      res.status(STATUS_CODE.OK)
    } catch (e) {
      res.status(STATUS_CODE.BAD_REQUEST).send({ message: e.message })
    }
  }
)

export { addToCartRouter }
