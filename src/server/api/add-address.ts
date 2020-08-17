import express, { Request, Response } from 'express'
import { prisma } from '../utils/prisma'
import { STATUS_CODE, ERROR_MSG } from '~/../constants'
import { body } from 'express-validator'
import { requestValidator } from '~/middlewares'

const addAddressRouter = express.Router()

export type AddAddressApiRequestBody = {
  address1: string
  address2?: string
}

addAddressRouter.post(
  '/add-address',
  [
    body('address1').trim().exists({ checkFalsy: true }).isString(),
    body('address2').optional().isString(),
    requestValidator(),
  ],
  async (req: Request<{}, {}, AddAddressApiRequestBody>, res: Response) => {
    const userId = req.auth?.userId ?? 18
    const address1 = req.body.address1.trim()
    const address2 = req.body.address2?.trim()

    try {
      if (!address1) throw new Error(ERROR_MSG.EMPTY_ADDRESS)

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
    } catch (e) {
      console.error(e)

      res.status(STATUS_CODE.BAD_REQUEST).send(e.message)
    }
  }
)

export { addAddressRouter }
