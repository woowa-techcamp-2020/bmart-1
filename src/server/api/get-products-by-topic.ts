import express, { Request, Response } from 'express'
import { ERROR_MSG, PAGINATION, STATUS_CODE } from '~/../constants'
import {
  GetProductsByTopicRequestQuery,
  GetProductsByTopicResponse,
} from '~/../types/api'
import { prisma } from '~/utils/prisma'

const getProductsByTopicRouter = express.Router()

getProductsByTopicRouter.get(
  '/products-by-topic',
  async (
    req: Request<{}, {}, {}, GetProductsByTopicRequestQuery>,
    res: Response<GetProductsByTopicResponse>
  ) => {
    const topic = req.query.topic
    const userId = req.auth?.userId

    try {
      let products
      let queryStr

      switch (topic) {
        case 'new':
          products = await prisma.product.findMany({
            take: PAGINATION.PRODUCTS_NUM_IN_NEW,
            orderBy: {
              createdAt: 'desc',
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
          })

          if (userId) {
            const productsWithJjimmed = products.map((product) => {
              const { jjims, ...productInfo } = product

              return { ...productInfo, isJjimmed: jjims.length > 0 }
            })

            res.json(productsWithJjimmed)
          }

          return res.json(products)

        case 'now':
          if (userId)
            queryStr = `
            SELECT product.*, CASE WHEN jjim.userId IS NOT NULL THEN true ELSE false END AS isJjimmed
            FROM product LEFT JOIN jjim ON product.id = jjim.productId
            WHERE jjim.userId is null OR jjim.userId = ${userId}
            ORDER BY rand() LIMIT ${PAGINATION.PRODUCTS_NUM_IN_NOW};
            `
          else
            queryStr = `SELECT product.* FROM product LEFT JOIN jjim ON product.id = jjim.productId ORDER BY rand() LIMIT ${PAGINATION.PRODUCTS_NUM_IN_NOW};`

          products = await prisma.$queryRaw(queryStr)

          return res.json(products)

        default:
          throw new Error(ERROR_MSG.NO_ADDRESS)
      }
    } catch (e) {
      console.error(e)
      res.status(STATUS_CODE.BAD_REQUEST).send({ message: e.message })
    }
  }
)

export { getProductsByTopicRouter }
