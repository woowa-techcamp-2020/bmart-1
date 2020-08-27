import express, { Request, Response } from 'express'
import { ERROR_MSG, STATUS_CODE } from '~/../constants'
import { GetJjimsApiResponse } from '~/../types/api'
import { prisma } from '../utils/prisma'

const getJjimsRouter = express.Router()

getJjimsRouter.get(
  '/jjims',
  async (req: Request, res: Response<GetJjimsApiResponse>) => {
    const userId = req.auth?.userId

    try {
      const jjims = await prisma.jjim.findMany({
        where: {
          userId,
        },
        include: {
          product: true,
        },
      })

      res.send(jjims.map((x) => x.product))
    } catch (e) {
      console.error(e)
      res
        .status(STATUS_CODE.INTERNAL_ERROR)
        .send({ message: ERROR_MSG.INTERNAL_ERROR })
    }
  }
)

export { getJjimsRouter }
