import express, { Request } from 'express'
import { prisma } from '../utils/prisma'
import { STATUS_CODE, ERROR_MSG } from '~/../constants'
import { body } from 'express-validator'
import { requestValidator } from '~/middlewares'

const deleteFromCartRouter = express.Router()

type DeleteFromCartBody = {
  productIds: number[]
}

function productIdsValidator(ids: number[]) {
  return ids.every((id) => typeof id === 'number')
}

deleteFromCartRouter.delete(
  '/delete-from-cart',
  body('productIds').isArray({ min: 1 }).custom(productIdsValidator),
  requestValidator(),
  async (req: Request<{}, {}, DeleteFromCartBody>, res) => {
    const userId = (req.auth?.userId as number) ?? 15
    const productIds = req.body.productIds

    const queryString = `
    DELETE FROM cart WHERE (userId, productId) IN (${productIds
      .map((productId) => `(${userId}, ${productId})`)
      .join(',')})
    `

    try {
      await prisma.$queryRaw(queryString)
      res.sendStatus(STATUS_CODE.OK)
    } catch (e) {
      console.error(e)

      res.status(STATUS_CODE.INTERNAL_ERROR).send({ message: ERROR_MSG.INTERNAL_ERROR })
    }
  }
)

export { deleteFromCartRouter }
