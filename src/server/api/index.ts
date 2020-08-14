import express from 'express'
import { needToken } from '~/middlewares'
import { getUserInfoRouter } from './get-user-info'
import { getJjimsRouter } from './get-jjims'
import { getProductsByTopicRouter } from './get-products-by-topic'
import { addToCartRouter } from './add-to-cart'
import { deleteAddressRouter } from './delete-address'
import { addAddressRouter } from './add-address'
import { getProductsByCategoryRouter } from './get-products-by-category'
import { getProductsInCartRouter } from './get-products-in-cart'
import { deleteFromCartRouter } from './delete-from-cart'
import { setDefaultAddressRouter } from './set-default-address'
import { searchRouter } from './search'
import { toggleJjimRouter } from './toggle-jjim'

const apiRouter = express.Router()

apiRouter.use(needToken())
apiRouter.use('/api', getUserInfoRouter)
apiRouter.use('/api', getJjimsRouter)
apiRouter.use('/api', getProductsByTopicRouter)
apiRouter.use('/api', addToCartRouter)
apiRouter.use('/api', deleteAddressRouter)
apiRouter.use('/api', addAddressRouter)
apiRouter.use('/api', getProductsByCategoryRouter)
apiRouter.use('/api', getProductsInCartRouter)
apiRouter.use('/api', deleteFromCartRouter)
apiRouter.use('/api', setDefaultAddressRouter)
apiRouter.use('/api', searchRouter)
apiRouter.use('/api', toggleJjimRouter)

export { apiRouter }
