import express, { Request, Response } from 'express'
import { prisma } from '../utils/prisma'
import { ProductOrderByInput, Product } from '@prisma/client'
import { ErrorResponse } from '~/types/res'
import { STATUS_CODE, ERROR_MSG } from '~/../constants'
import { query } from 'express-validator'
import { requestValidator } from '~/middlewares'

const getProductsByCategoryRouter = express.Router()

export type GetProductsByCategoryApiRequestQuery = {
  category: string
  page?: number
  sortBy?: string
  direction?: 'asc' | 'desc'
}

export type GetProductsByCategoryApiResponse = Product[] | ErrorResponse

const amountOfPage = 30

getProductsByCategoryRouter.get(
  '/products-by-category',
  [
    query('category').exists({ checkFalsy: true }),
    query('page').optional().isInt(),
    query('sortBy').optional().isString(),
    query('direction').optional().isString(),
    requestValidator(),
  ],
  async (
    req: Request<{}, {}, {}, GetProductsByCategoryApiRequestQuery>,
    res: Response<GetProductsByCategoryApiResponse>
  ) => {
    const { category, page, sortBy, direction } = req.query

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
