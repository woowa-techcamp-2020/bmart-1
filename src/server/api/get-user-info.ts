import express from 'express'
import { prisma } from '../utils/prisma'

const getUserInfoRouter = express.Router()

getUserInfoRouter.get('/me', async (req, res) => {
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

export { getUserInfoRouter }
