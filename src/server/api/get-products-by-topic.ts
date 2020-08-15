import express, { Request, Response } from 'express'
import { prisma } from '~/utils/prisma'
import { ERROR_MSG, STATUS_CODE, PAGINATION } from '~/../constants'

function pickRandomIds(ids: number[], take: number): number[] {
  const result = new Set<number>()
  const size = Math.min(take, ids.length)
  while (result.size !== size) {
    const value = ids[Math.floor(Math.random() * ids.length)]
    if (result.has(value)) continue
    result.add(value)
  }
  return [...result]
}

function pickProductById(id: number) {
  return prisma.product.findOne({
    where: {
      id,
    },
  })
}

type GetProductsByTopicQuery = {
  topic: string
}

const getProductsByTopicRouter = express.Router()
getProductsByTopicRouter.get(
  '/products-by-topic',
  async (req: Request<{}, GetProductsByTopicQuery>, res: Response) => {
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
          const ids = (
            await prisma.product.findMany({
              select: {
                id: true,
              },
            })
          ).map((x) => x.id)

          const nowProducts = await Promise.all(
            pickRandomIds(ids, PAGINATION.PRODUCTS_NUM_IN_NOW).map((id) => pickProductById(id))
          )
          return res.send(nowProducts)
        default:
          return res.status(STATUS_CODE.BAD_REQUEST).send({ message: ERROR_MSG.INVALID_TOPIC })
      }
    } catch (e) {
      res.status(STATUS_CODE.BAD_REQUEST).send({ message: e.message })
    }
  }
)

export { getProductsByTopicRouter }
