import { ProductOrderByInput } from '@prisma/client'
import express, { Request, Response } from 'express'
import { query } from 'express-validator'
import { ERROR_MSG, STATUS_CODE } from '~/../constants'
import {
  GetProductsByCategoryApiRequestQuery,
  GetProductsByCategoryApiResponse,
} from '~/../types/api'
import { requestValidator } from '~/middlewares'
import { prisma } from '../utils/prisma'

const getProductsByCategoryRouter = express.Router()

const amountOfPage = 30

getProductsByCategoryRouter.get(
  '/products-by-category',
  [
    query('category').exists({ checkFalsy: true }),
    query('page').optional().isString(),
    query('sortBy').optional().isString(),
    query('direction').optional().isString(),
    requestValidator(),
  ],
  async (
    req: Request<{}, {}, {}, GetProductsByCategoryApiRequestQuery>,
    res: Response<GetProductsByCategoryApiResponse>
  ) => {
    const { category, sortBy, direction } = req.query
    const page = req.query.page ? parseInt(req.query.page) : null

    const orderByOptions = {
      orderBy: {
        [sortBy || 'createdAt']: direction || 'desc',
      },
    } as {
      orderBy: ProductOrderByInput | ProductOrderByInput[] | undefined
    }

    try {
      const products = await prisma.product.findMany({
        where: {
          category,
        },
        skip: ((page ?? 1) - 1) * amountOfPage,
        take: amountOfPage,
        ...orderByOptions,
      })

      res.json(products)
    } catch (e) {
      console.log(e)

      res.status(STATUS_CODE.BAD_REQUEST).send({ message: ERROR_MSG.INTERNAL_ERROR })
    }
  }
)

export { getProductsByCategoryRouter }
