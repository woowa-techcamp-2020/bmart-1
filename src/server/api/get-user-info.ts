import express, { Request, Response } from 'express'
import { prisma } from '../utils/prisma'
import { Address, User } from '@prisma/client'
import { ErrorResponse } from '~/types/res'
import { STATUS_CODE, ERROR_MSG } from '~/../constants'

const getUserInfoRouter = express.Router()

type FoundUser = (User & { addresses: Address[] }) | null

export type GetUserInfoApiResponse = FoundUser | ErrorResponse

getUserInfoRouter.get('/me', async (req: Request, res: Response<GetUserInfoApiResponse>) => {
  const userId = req.auth?.userId

  try {
    const user = await prisma.user.findOne({
      where: {
        id: userId,
      },
      include: {
        addresses: true,
      },
    })

    res.json(user)
  } catch (e) {
    console.error(e)

    res.status(STATUS_CODE.INTERNAL_ERROR).send({ message: ERROR_MSG.INTERNAL_ERROR })
  }
})

export { getUserInfoRouter }
