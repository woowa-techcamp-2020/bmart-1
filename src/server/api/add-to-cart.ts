import { prisma } from '../utils/prisma'
import express, { Request, Response } from 'express'
import { cartCreateInput, cartUpdateInput } from '@prisma/client'
import { ERROR_CODE } from '~/../constants'
const addToCartRouter = express.Router()
addToCartRouter.post('/add-to-cart', async (req: Request, res: Response) => {
  const userId = req.auth?.userId as number
  const { productId, quantity } = req.body
  try {
    const query: cartCreateInput | cartUpdateInput = {
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
      create: query as cartCreateInput,
      update: query as cartUpdateInput,
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    })
    res.status(ERROR_CODE.OK)
  } catch (e) {
    res.status(ERROR_CODE.BAD_REQUEST).send({ message: e.message })
  }
})

export { addToCartRouter }
