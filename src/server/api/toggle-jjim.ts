import express from 'express'
import { prisma } from '../utils/prisma'

const toggleJjimRouter = express.Router()

toggleJjimRouter.put('/jjim', async (req, res) => {
  const userId = req.auth?.userId || 16
  const productId = req.body.productId

  try {
    const jjim = await prisma.jjim.findOne({ where: { userId_productId: { userId, productId } } })

    if (jjim) {
      await prisma.jjim.delete({ where: { userId_productId: { userId, productId } } })
    } else {
      await prisma.jjim.create({
        data: { user: { connect: { id: userId } }, product: { connect: { id: productId } } },
      })
    }

    res.json(true)
  } catch (err) {
    console.error(err)

    res.sendStatus(500)
  }
})

export { toggleJjimRouter }
