import express from 'express'
import { getUserInfoRouter } from './get-user-info'
import { getProductsInCartRouter } from './get-products-in-cart'
import { deleteFromCartRouter } from './delete-from-cart'
import { setDefaultAddressRouter } from './set-default-address'
import { searchRouter } from './search'

const apiRouter = express.Router()

apiRouter.use('/api', getUserInfoRouter)
apiRouter.use('/api', getProductsInCartRouter)
apiRouter.use('/api', deleteFromCartRouter)
apiRouter.use('/api', setDefaultAddressRouter)
apiRouter.use('/api', searchRouter)

export { apiRouter }
