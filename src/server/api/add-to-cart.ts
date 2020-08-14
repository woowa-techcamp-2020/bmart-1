import { prisma } from '../utils/prisma'
import express, { Request, Response } from 'express'
import { CartCreateInput, CartUpdateInput } from '@prisma/client'
import { STATUS_CODE } from '~/../constants'
const addToCartRouter = express.Router()
addToCartRouter.post('/add-to-cart', async (req: Request, res: Response) => {
  const userId = req.auth?.userId as number
  const { productId, quantity } = req.body
  try {
    const query: CartCreateInput | CartUpdateInput = {
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
      create: query as CartCreateInput,
      update: query as CartUpdateInput,
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    })
    res.status(STATUS_CODE.OK)
  } catch (e) {
    res.status(STATUS_CODE.BAD_REQUEST).send({ message: e.message })
  }
})

export { addToCartRouter }
