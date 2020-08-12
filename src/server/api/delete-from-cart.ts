import express from 'express'
import { prisma } from '../utils/prisma'

const deleteFromCartRouter = express.Router()

function deleteFromCart(userId: number, productId: number) {
  return prisma.cart.delete({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  })
}

deleteFromCartRouter.delete('/delete-from-cart', async (req, res) => {
  const userId = req.auth?.userId

  const productIds = req.body.productIds

  const result = await Promise.all(productIds.map((productId) => deleteFromCart(userId, productId)))
  res.json({ message: `${result.length} items deleted` })
})

export { deleteFromCartRouter }
