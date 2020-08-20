import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { ERROR_MSG, STATUS_CODE } from '~/../constants'
import { ToggleJjimRequestBody } from '~/../types/api'
import { requestValidator } from '~/middlewares'
import { prisma } from '../utils/prisma'

const toggleJjimRouter = express.Router()

toggleJjimRouter.put(
  '/jjim',
  [body('productId').notEmpty().isInt()],
  requestValidator(),
  async (req: Request<{}, {}, ToggleJjimRequestBody>, res: Response) => {
    const userId = req.auth?.userId || 16
    const { productId } = req.body

    try {
      const product = await prisma.product.findOne({ where: { id: productId } })

      if (!product) throw new Error(ERROR_MSG.NO_PRODUCT)

      const jjim = await prisma.jjim.findOne({ where: { userId_productId: { userId, productId } } })

      if (jjim) {
        await prisma.jjim.delete({ where: { userId_productId: { userId, productId } } })
      } else {
        await prisma.jjim.create({
          data: { user: { connect: { id: userId } }, product: { connect: { id: productId } } },
        })
      }

      res.sendStatus(STATUS_CODE.OK)
    } catch (e) {
      console.error(e)

      res.status(STATUS_CODE.BAD_REQUEST).send(e.message)
    }
  }
)

export { toggleJjimRouter }
