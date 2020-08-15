import express, { Request } from 'express'
import { prisma } from '../utils/prisma'
import { STATUS_CODE, ERROR_MSG } from '~/../constants'

const setDefaultAddressRouter = express.Router()

export type SetDefaultAddressApiRequestBody = {
  defaultAddressId: number
}

setDefaultAddressRouter.patch(
  '/set-default-address',
  async (req: Request<{}, {}, SetDefaultAddressApiRequestBody>, res) => {
    const userId = req.auth?.userId
    const { defaultAddressId } = req.body

    try {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          defaultAddress: {
            connect: {
              id: defaultAddressId,
            },
          },
        },
      })

      res.sendStatus(STATUS_CODE.OK)
    } catch (err) {
      console.error(err)

      res.status(STATUS_CODE.INTERNAL_ERROR).send(ERROR_MSG.INTERNAL_ERROR)
    }
  }
)

export { setDefaultAddressRouter }
