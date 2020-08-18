import express, { Request, Response } from 'express'
import { ERROR_MSG, PAGINATION, STATUS_CODE } from '~/../constants'
import { GetProductsByTopicRequestQuery } from '~/../types/api'
import { prisma } from '~/utils/prisma'

const getProductsByTopicRouter = express.Router()

getProductsByTopicRouter.get(
  '/products-by-topic',
  async (req: Request<{}, GetProductsByTopicRequestQuery>, res: Response) => {
    const topic = req.query.topic

    try {
      switch (topic) {
        case 'new':
          const newProducts = await prisma.product.findMany({
            take: PAGINATION.PRODUCTS_NUM_IN_NEW,
            orderBy: {
              createdAt: 'desc',
            },
          })

          return res.send(newProducts).end()

        case 'now':
          const nowProducts = await prisma.$queryRaw(
            `SELECT * from product order by rand() limit ${PAGINATION.PRODUCTS_NUM_IN_NOW}`
          )

          return res.send(nowProducts)

        default:
          return res.status(STATUS_CODE.BAD_REQUEST).send({ message: ERROR_MSG.INVALID_TOPIC })
      }
    } catch (e) {
      console.error(e)
      res.status(STATUS_CODE.BAD_REQUEST).send({ message: e.message })
    }
  }
)

export { getProductsByTopicRouter }
