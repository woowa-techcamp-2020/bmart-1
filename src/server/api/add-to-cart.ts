import { prisma } from '../utils/prisma'
import express, { Request, Response } from 'express'
import { cartCreateInput } from '@prisma/client'
const addToCartRouter = express.Router()
addToCartRouter.post('/add-to-cart', async (req: Request, res: Response) => {
  const userId = req.auth?.userId as number
  const { productId, quantity } = req.body
  try {
    const query: cartCreateInput = {
      user: {
        connect: {
          id: userId,
        },
      },
      product: {
        connect: {
          id: productId,
        },
      },
      quantity,
    }
    const cart = await prisma.cart.upsert({
      create: query,
      update: query,
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    })
    res.send(cart)
  } catch (e) {
    res.status(400).send({ message: e.message }).end()
  }
})

export { addToCartRouter }
