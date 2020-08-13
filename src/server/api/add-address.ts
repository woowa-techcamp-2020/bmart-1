import express, { Request } from 'express'
import { prisma } from '../utils/prisma'

const addAddressRouter = express.Router()

export type AddAddressApiRequestData = {
  address1: string
  address2: string
}

addAddressRouter.post(
  '/add-address',
  async (req: Request<{}, {}, AddAddressApiRequestData>, res) => {
    const userId = req.auth?.userId ?? 18
    const { address1, address2 } = req.body

    if (!address1) {
      res.sendStatus(500)
      return
    }

    try {
      await prisma.address.create({
        data: {
          address1,
          address2,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      })
    } catch (err) {
      console.error(err)
      res.sendStatus(500)
    }

    res.json(true)
  }
)

export { addAddressRouter }
