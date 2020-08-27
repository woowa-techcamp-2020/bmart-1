import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { STATUS_CODE } from '~/../constants'
import { EditAddressApiRequestBody } from '~/../types/api'
import { requestValidator } from '~/middlewares'
import { prisma } from '../utils/prisma'

const editAddressRouter = express.Router()

editAddressRouter.put(
  '/edit-address',
  [
    body('addressId').isInt().toInt(),
    body('address1').trim().exists({ checkFalsy: true }).isString(),
    body('address2').optional().isString(),
  ],
  requestValidator(),
  async (req: Request<{}, {}, EditAddressApiRequestBody>, res: Response) => {
    const userId = req.auth?.userId
    const addressId = req.body.addresssId
    const address1 = req.body.address1.trim()
    const address2 = req.body.address2?.trim()

    try {
      await prisma.address.update({
        where: {
          id: addressId,
          userId,
        },
        data: {
          address1,
          address2,
        },
      })

      res.sendStatus(STATUS_CODE.OK)
    } catch (e) {
      console.error(e)

      res.status(STATUS_CODE.BAD_REQUEST).send(e.message)
    }
  }
)

export { editAddressRouter }
