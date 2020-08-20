import express from 'express'
import { needToken } from '~/middlewares'
import { addAddressRouter } from './add-address'
import { addToCartRouter } from './add-to-cart'
import { deleteAddressRouter } from './delete-address'
import { deleteFromCartRouter } from './delete-from-cart'
import { getJjimsRouter } from './get-jjims'
import { getProductRouter } from './get-product'
import { getProductsByCategoryRouter } from './get-products-by-category'
import { getProductsByTopicRouter } from './get-products-by-topic'
import { getProductsInCartRouter } from './get-products-in-cart'
import { getSubCategoriesRouter } from './get-sub-categories'
import { getUserInfoRouter } from './get-user-info'
import { patchProductQuantityInCartRouter } from './patch-product-quantity-in-cart'
import { searchRouter } from './search'
import { setDefaultAddressRouter } from './set-default-address'
import { toggleJjimRouter } from './toggle-jjim'

const apiRouter = express.Router()

apiRouter.use(getProductsByCategoryRouter)
apiRouter.use(getProductsByTopicRouter)
apiRouter.use(getSubCategoriesRouter)
apiRouter.use(getProductRouter)

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
apiRouter.use(patchProductQuantityInCartRouter)

export { apiRouter }
