import { ProductOrderByInput } from '@prisma/client'
import express, { Request, Response } from 'express'
import { query } from 'express-validator'
import { ERROR_MSG, STATUS_CODE } from '~/../constants'
import { GetProductsByCategoryApiResponse } from '~/../types/api'
import { requestValidator } from '~/middlewares'
import { prisma } from '../utils/prisma'
import { GetProductsByCategoryApiRequestQuery } from './../../types/api'

const getProductsByCategoryRouter = express.Router()

const defaultAmount = 30

getProductsByCategoryRouter.get(
  '/products-by-category',
  [
    query('category').exists({ checkFalsy: true }),
    query('page').optional().toInt().isInt(),
    query('amount').optional().toInt().isInt(),
    query('sortBy').optional().isString(),
    query('direction').optional().isString(),
  ],
  requestValidator<{}, GetProductsByCategoryApiRequestQuery>(),
  async (
    req: Request<{}, {}, {}, GetProductsByCategoryApiRequestQuery>,
    res: Response<GetProductsByCategoryApiResponse>
  ) => {
    const { category, sortBy, direction, page, amount } = req.query
    const userId = req.auth?.userId

    const take = amount ?? defaultAmount

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
          subcategory: category,
        },
        include: {
          jjims: userId
            ? {
                where: {
                  userId,
                },
              }
            : false,
        },
        skip: ((page ?? 1) - 1) * take,
        take: take,
        ...orderByOptions,
        distinct: ['id'],
      })

      if (userId) {
        const productsWithJjimmed = products.map((product) => {
          const { jjims, ...productInfo } = product

          return { ...productInfo, isJjimmed: jjims.length > 0 }
        })

        res.json(productsWithJjimmed).end()

        return
      }

      res.json(products).end()
    } catch (e) {
      console.log(e)

      res
        .status(STATUS_CODE.BAD_REQUEST)
        .send({ message: ERROR_MSG.INTERNAL_ERROR })
    }
  }
)

export { getProductsByCategoryRouter }
