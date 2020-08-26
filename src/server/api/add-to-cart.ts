import { CartCreateInput, CartUpdateInput } from '@prisma/client'
import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { CONSTRAINT, ERROR_MSG, STATUS_CODE } from '~/../constants'
import { AddToCartRequestBody } from '~/../types/api'
import { requestValidator } from '~/middlewares'
import { prisma } from '../utils/prisma'

const addToCartRouter = express.Router()

addToCartRouter.post(
  '/add-to-cart',
  [
    body('productId').isInt(),
    body('quantity').isInt({ min: CONSTRAINT.MIN_QUANTITY }),
  ],
  requestValidator(),
  async (req: Request<{}, {}, AddToCartRequestBody>, res: Response) => {
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
      res.sendStatus(STATUS_CODE.OK)
    } catch (e) {
      console.error(e)
      res.status(STATUS_CODE.BAD_REQUEST).send({ message: e.message })
    }
  }
)

export { addToCartRouter }
