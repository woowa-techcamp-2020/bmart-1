import { Jjim } from '@prisma/client'
import express, { Request, Response } from 'express'
import { ERROR_MSG, STATUS_CODE } from '~/../constants'
import { ErrorResponse } from '~/types/res'
import { prisma } from '../utils/prisma'

const getJjimsRouter = express.Router()

export type GetJjimsApiResponse = Jjim[] | ErrorResponse

getJjimsRouter.get('/jjims', async (req: Request, res: Response<GetJjimsApiResponse>) => {
  const userId = req.auth?.userId

  try {
    const jjims = await prisma.jjim.findMany({
      where: {
        userId,
      },
    })

    res.send(jjims)
  } catch (e) {
    console.error(e)
    res.status(STATUS_CODE.INTERNAL_ERROR).send({ message: ERROR_MSG.INTERNAL_ERROR })
  }
})

export { getJjimsRouter }
