import express, { Request, Response } from 'express'
import { prisma } from '../utils/prisma'
import { STATUS_CODE, ERROR_MSG } from '~/../constants'
import { body } from 'express-validator'
import { requestValidator } from '~/middlewares'

const setDefaultAddressRouter = express.Router()

export type SetDefaultAddressApiRequestBody = {
  defaultAddressId: number
}

setDefaultAddressRouter.patch(
  '/set-default-address',
  [body('defaultAddressId').isInt(), requestValidator()],
  async (req: Request<{}, {}, SetDefaultAddressApiRequestBody>, res: Response) => {
    const userId = req.auth?.userId
    const { defaultAddressId } = req.body

    try {
      const selectedAddress = await prisma.address.findOne({
        where: { id: defaultAddressId },
      })

      if (!selectedAddress) throw new Error(ERROR_MSG.NO_ADDRESS)
      if (selectedAddress.userId !== userId) throw new Error(ERROR_MSG.NOT_YOUR_ADDRESS)

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
    } catch (e) {
      console.error(e)

      res.status(STATUS_CODE.BAD_REQUEST).send(e.message)
    }
  }
)

export { setDefaultAddressRouter }
