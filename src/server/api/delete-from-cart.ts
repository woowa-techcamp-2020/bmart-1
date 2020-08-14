import express from 'express'
import { prisma } from '../utils/prisma'

const deleteFromCartRouter = express.Router()

deleteFromCartRouter.delete('/delete-from-cart', async (req, res) => {
  const userId = req.auth?.userId

  const productIds = req.body.productIds

  try {
    for await (let productId of productIds) {
      await prisma.cart.delete({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
      })
    }
    res.json(true)
  } catch (err) {
    console.error(err)

    res.sendStatus(500)
  }
})

export { deleteFromCartRouter }
