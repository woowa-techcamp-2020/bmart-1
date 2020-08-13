import express from 'express'
import { getUserInfoRouter } from './get-user-info'
import { addAddressRouter } from './add-address'
import { getProductsByCategoryRouter } from './get-products-by-category'

const apiRouter = express.Router()

apiRouter.use('/api', getUserInfoRouter)
apiRouter.use('/api', addAddressRouter)
apiRouter.use('/api', getProductsByCategoryRouter)

export { apiRouter }
