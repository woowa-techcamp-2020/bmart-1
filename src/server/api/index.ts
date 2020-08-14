import express from 'express'
import { getUserInfoRouter } from './get-user-info'
import { getJjimsRouter } from './get-jjims'
import { getProductsByTopicRouter } from './get-products-by-topic'
import { addToCartRouter } from './add-to-cart'
import { deleteAddressRouter } from './delete-address'

const apiRouter = express.Router()

apiRouter.use('/api', getUserInfoRouter)
apiRouter.use('/api', getJjimsRouter)
apiRouter.use('/api', getProductsByTopicRouter)
apiRouter.use('/api', addToCartRouter)
apiRouter.use('/api', deleteAddressRouter)

export { apiRouter }
