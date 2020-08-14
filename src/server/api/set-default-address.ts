import express from 'express'
import { prisma } from '../utils/prisma'

const setDefaultAddressRouter = express.Router()

setDefaultAddressRouter.patch('/set-default-address', async (req, res) => {
  const userId = req.auth?.userId
  const defaultAddressId = req.body.addressId

  try {
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

    res.json(true)
  } catch (err) {
    console.error(err)

    res.sendStatus(500)
  }
})

export { setDefaultAddressRouter }
