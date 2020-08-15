import express, { Request } from 'express'
import { prisma } from '../utils/prisma'
import { STATUS_CODE, ERROR_MSG } from '~/../constants'

const addAddressRouter = express.Router()

export type AddAddressApiRequestBody = {
  address1: string
  address2?: string
}

addAddressRouter.post(
  '/add-address',
  async (req: Request<{}, {}, AddAddressApiRequestBody>, res) => {
    const userId = req.auth?.userId ?? 18
    const address1 = req.body.address1.trim()
    const address2 = req.body.address2?.trim()

    if (!address1) {
      res.sendStatus(500)
      return
    }

    try {
      await prisma.address.create({
        data: {
          address1,
          address2: address2 || null,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      })

      res.sendStatus(STATUS_CODE.OK)
    } catch (err) {
      res.status(STATUS_CODE.INTERNAL_ERROR).send({ message: ERROR_MSG.INTERNAL_ERROR })
    }
  }
)

export { addAddressRouter }
