import express from 'express'
import { getUserInfoRouter } from './get-user-info'
import { addAddressRouter } from './add-address'

const apiRouter = express.Router()

apiRouter.use('/api', getUserInfoRouter)
apiRouter.use('/api', addAddressRouter)

export { apiRouter }
