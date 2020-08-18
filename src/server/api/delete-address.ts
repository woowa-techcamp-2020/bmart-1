import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { ERROR_MSG, STATUS_CODE } from '~/../constants'
import { DeleteAddressRequestBody } from '~/../types/api'
import { requestValidator } from '~/middlewares'
import { prisma } from '../utils/prisma'

const deleteAddressRouter = express.Router()

deleteAddressRouter.delete(
  '/delete-address',
  [body('addressId').exists()],
  requestValidator(),
  async (req: Request<{}, {}, DeleteAddressRequestBody>, res: Response) => {
    const userId = req.auth?.userId
    const { addressId } = req.body

    try {
      const address = await prisma.address.findOne({
        where: {
          id: addressId,
        },
      })

      if (!address) {
        throw new Error(ERROR_MSG.NO_ADDRESS)
      }

      if (address.userId !== userId) throw new Error(ERROR_MSG.NOT_YOUR_ADDRESS)

      await prisma.address.delete({ where: { id: addressId, userId: userId } })
      res.status(STATUS_CODE.OK)
    } catch (e) {
      console.error(e)
      res.status(STATUS_CODE.BAD_REQUEST).send({ message: e.message })
    }
  }
)

export { deleteAddressRouter }
