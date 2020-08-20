import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { ERROR_MSG, STATUS_CODE } from '~/../constants'
import {
  PatchProductQuantityInCartApiRequestBody,
  PatchProductQuantityInCartApiResponse,
} from '~/../types/api'
import { requestValidator } from '~/middlewares'
import { prisma } from '../utils/prisma'

const patchProductQuantityInCartRouter = express.Router()

patchProductQuantityInCartRouter.patch(
  '/product-quantity-in-cart',
  [
    body('productId').exists({ checkFalsy: true }).isInt(),
    body('quantity').exists({ checkFalsy: true }).isInt(),
  ],
  requestValidator(),
  async (
    req: Request<{}, {}, PatchProductQuantityInCartApiRequestBody>,
    res: Response<PatchProductQuantityInCartApiResponse>
  ) => {
    const userId = req.auth?.userId as number
    const { productId, quantity } = req.body

    try {
      const productInCart = await prisma.cart.findOne({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
      })

      if (!productInCart) throw new Error(ERROR_MSG.NO_PRODUCT_IN_CART)

      await prisma.cart.update({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
        data: {
          quantity,
        },
      })

      res.sendStatus(STATUS_CODE.OK)
    } catch (e) {
      console.error(e)

      res.status(STATUS_CODE.BAD_REQUEST).send({ message: e.message })
    }
  }
)

export { patchProductQuantityInCartRouter }
