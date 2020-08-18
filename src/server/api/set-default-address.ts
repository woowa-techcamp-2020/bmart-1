import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { ERROR_MSG, STATUS_CODE } from '~/../constants'
import { SetDefaultAddressApiRequestBody } from '~/../types/api'
import { requestValidator } from '~/middlewares'
import { prisma } from '../utils/prisma'

const setDefaultAddressRouter = express.Router()

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
