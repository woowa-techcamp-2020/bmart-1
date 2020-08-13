import express from 'express'
import { prisma } from '../utils/prisma'

const getProductsInCartRouter = express.Router()

getProductsInCartRouter.get('/products-in-cart', async (req, res) => {
  const userId = req.auth?.userId

  try {
    const productsInCart = await prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    })
    res.json(productsInCart)
  } catch (err) {
    console.error(err)

    res.sendStatus(500)
  }
})

export { getProductsInCartRouter }
