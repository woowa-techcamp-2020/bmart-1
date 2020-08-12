import express from 'express'
import { prisma } from './utils/prisma'

const apiRouter = express.Router()

apiRouter.get('/me', async (req, res) => {
  const userId = req.auth?.userId

  const user = await prisma.user.findOne({
    where: {
      id: userId,
    },
    include: {
      addresses: true,
    },
  })

  res.json(user)
})

export { apiRouter }
