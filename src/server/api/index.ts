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
import { getSubCategoriesRouter } from './get-sub-categories'

const apiRouter = express.Router()

apiRouter.use(getProductsByCategoryRouter)
apiRouter.use(getProductsByTopicRouter)
apiRouter.use(getSubCategoriesRouter)

apiRouter.use(searchRouter)

apiRouter.use(needToken())

apiRouter.use(getUserInfoRouter)
apiRouter.use(getJjimsRouter)
apiRouter.use(addToCartRouter)
apiRouter.use(deleteAddressRouter)
apiRouter.use(addAddressRouter)
apiRouter.use(getProductsInCartRouter)
apiRouter.use(deleteFromCartRouter)
apiRouter.use(setDefaultAddressRouter)
apiRouter.use(toggleJjimRouter)

export { apiRouter }
