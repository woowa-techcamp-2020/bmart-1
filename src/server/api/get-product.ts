import express, { Request, Response } from 'express'
import { query } from 'express-validator'
import { ERROR_MSG, STATUS_CODE } from '~/../constants'
import { GetProductApiRequestQuery, GetProductApiResponse } from '~/../types/api'
import { requestValidator } from '~/middlewares'
import { prisma } from '../utils/prisma'

const getProductRouter = express.Router()

getProductRouter.get(
  '/product',
  [query('productId').exists({ checkFalsy: true }), requestValidator()],
  async (
    req: Request<{}, {}, {}, GetProductApiRequestQuery>,
    res: Response<GetProductApiResponse>
  ) => {
    const productId = parseInt(req.query.productId)

    try {
      const product = await prisma.product.findOne({ where: { id: productId } })

      if (!product) throw new Error(ERROR_MSG.NO_PRODUCT)

      res.send(product)
    } catch (e) {
      console.error(e)

      res.status(STATUS_CODE.BAD_REQUEST).send({ message: e.message })
    }
  }
)

export { getProductRouter }
