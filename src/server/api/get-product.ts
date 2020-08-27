import express, { Request, Response } from 'express'
import { query } from 'express-validator'
import { ERROR_MSG, STATUS_CODE } from '~/../constants'
import {
  GetProductApiRequestQuery,
  GetProductApiResponse,
} from '~/../types/api'
import { requestValidator } from '~/middlewares'
import { prisma } from '../utils/prisma'

const getProductRouter = express.Router()

getProductRouter.get(
  '/product',
  [query('productId').exists({ checkFalsy: true })],
  requestValidator<{}, GetProductApiRequestQuery>(),
  async (
    req: Request<{}, {}, {}, GetProductApiRequestQuery>,
    res: Response<GetProductApiResponse>
  ) => {
    const productId = parseInt(req.query.productId)
    const userId = req.auth?.userId

    try {
      const product = await prisma.product.findOne({
        where: { id: productId },
        include: {
          jjims: userId ? { where: { userId } } : false,
          carts: userId ? { where: { userId } } : false,
        },
      })

      if (!product) throw new Error(ERROR_MSG.NO_PRODUCT)

      if (userId) {
        const { jjims, carts, ...productInfo } = product
        const productWithJjimmedQuantity = {
          ...productInfo,
          isJjimmed: jjims.length > 0,
          quantityInCart: carts ? (carts[0] ? carts[0].quantity : 0) : 0,
        }

        res.json(productWithJjimmedQuantity)

        return
      }

      res.json(product)
    } catch (e) {
      console.error(e)

      res.status(STATUS_CODE.BAD_REQUEST).send({ message: e.message })
    }
  }
)

export { getProductRouter }
