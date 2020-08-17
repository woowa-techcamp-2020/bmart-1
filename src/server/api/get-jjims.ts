import { prisma } from '../utils/prisma'
import express, { Request, Response } from 'express'
import { Jjim } from '@prisma/client'
import { ErrorResponse } from '~/types/res'
import { STATUS_CODE, ERROR_MSG } from '~/../constants'

const getJjimsRouter = express.Router()

type jjimsByUser = Jjim[]

export type GetJjimsApiResponse = jjimsByUser | ErrorResponse

getJjimsRouter.get('/jjims', async (req: Request, res: Response<GetJjimsApiResponse>) => {
  const userId = req.auth?.userId

  try {
    const jjimsByUser = await prisma.jjim.findMany({
      where: {
        userId,
      },
    })

    res.send(jjimsByUser)
  } catch (e) {
    console.error(e)
    res.status(STATUS_CODE.INTERNAL_ERROR).send({ message: ERROR_MSG.INTERNAL_ERROR })
  }
})

export { getJjimsRouter }
