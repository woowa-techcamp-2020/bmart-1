import express, { Request } from 'express'
import { prisma } from '../utils/prisma'
import { STATUS_CODE, ERROR_MSG } from '~/../constants'

const deleteFromCartRouter = express.Router()

type DeleteFromCartBody = {
  productIds: number[]
}

deleteFromCartRouter.delete(
  '/delete-from-cart',
  async (req: Request<{}, {}, DeleteFromCartBody>, res) => {
    const userId = req.auth?.userId as number
    const productIds = req.body.productIds

    try {
      for await (let productId of productIds) {
        await prisma.cart.delete({
          where: {
            userId_productId: {
              userId,
              productId,
            },
          },
        })
      }
      res.status(STATUS_CODE.OK)
    } catch (err) {
      res.sendStatus(STATUS_CODE.INTERNAL_ERROR).send({ message: ERROR_MSG.INTERNAL_ERROR })
    }
  }
)

export { deleteFromCartRouter }
