import express, { Request, Response } from 'express'
import { prisma } from '~/utils/prisma'

const getProductsByTopicRouter = express.Router()
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

getProductsByTopicRouter.get('/products-by-topic', async (req: Request, res: Response) => {
  const topic = req.query.topic as string
  if (topic === 'new') {
    const products = await prisma.product.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
    })
    return res.send(products).end()
  } else if (topic === 'now') {
    const ids = (
      await prisma.product.findMany({
        select: {
          id: true,
        },
      })
    ).map((x) => x.id)
    const products = await Promise.all(pickRandomIds(ids, 10).map((id) => pickProductById(id)))
    return res.send(products).end()
  } else {
    return res.status(404).send({ message: '토픽이 유효하지 않거나 존재하지 않습니다.' }).end()
  }
})

export { getProductsByTopicRouter }
