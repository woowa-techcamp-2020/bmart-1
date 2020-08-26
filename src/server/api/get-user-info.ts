import express, { Request, Response } from 'express'
import { ERROR_MSG, STATUS_CODE } from '~/../constants'
import { GetUserInfoApiResponse } from '~/../types/api'
import { prisma } from '../utils/prisma'

const getUserInfoRouter = express.Router()

getUserInfoRouter.get(
  '/me',
  async (req: Request, res: Response<GetUserInfoApiResponse>) => {
    const userId = req.auth?.userId || ''

    try {
      const user = await prisma.user.findOne({
        where: {
          email: userId,
        },
        include: {
          addresses: true,
        },
      })

      res.json(user)
    } catch (e) {
      console.error(e)

      res
        .status(STATUS_CODE.INTERNAL_ERROR)
        .send({ message: ERROR_MSG.INTERNAL_ERROR })
    }
  }
)

export { getUserInfoRouter }
