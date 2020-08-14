import { prisma } from '../utils/prisma'
import express, { Request, Response } from 'express'
const getJjimsRouter = express.Router()
getJjimsRouter.get('/jjims', async (req: Request, res: Response) => {
  const userId = req.auth?.userId
  const user = await prisma.jjim.findMany({
    where: {
      userId,
    },
  })
  res.send(user)
})

export { getJjimsRouter }
