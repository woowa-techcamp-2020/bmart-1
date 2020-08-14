import { prisma } from '../utils/prisma'
import express, { Request, Response } from 'express'
const deleteAddressRouter = express.Router()
deleteAddressRouter.delete('/delete-address', async (req: Request, res: Response) => {
  const userId = req.auth?.userId
  const addressId = req.body.addressId
  try {
    const address = await prisma.address.delete({ where: { id: addressId, userId: userId } })
    res.send(address)
  } catch (e) {
    res.status(401).send({ message: e.message })
  }
})

export { deleteAddressRouter }
