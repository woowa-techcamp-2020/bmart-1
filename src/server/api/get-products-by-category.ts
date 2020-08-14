import express, { Request } from 'express'
import { prisma } from '../utils/prisma'
import { productOrderByInput } from '@prisma/client'

const getProductsByCategoryRouter = express.Router()

export type GetProductsByCategoryApiRequestQuery = {
  category: string
  page?: number
  sortBy?: string
  direction?: 'asc' | 'desc'
}

const amountOfPage = 30

getProductsByCategoryRouter.get(
  '/products-by-category',
  async (req: Request<{}, {}, {}, GetProductsByCategoryApiRequestQuery>, res) => {
    const { category, page, sortBy, direction } = req.query

    const orderByOptions = {
      orderBy: {
        [sortBy || 'createdAt']: direction || 'desc',
      },
    } as {
      orderBy: productOrderByInput | productOrderByInput[] | undefined
    }

    const products = await prisma.product.findMany({
      where: {
        category,
      },
      skip: ((page ?? 1) - 1) * amountOfPage,
      take: amountOfPage,
      ...orderByOptions,
    })

    res.json(products)
  }
)

export { getProductsByCategoryRouter }
