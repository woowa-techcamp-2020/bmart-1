import express from 'express'
import { getUserInfoRouter } from './get-user-info'
import { getJjimsRouter } from './get-jjims'
import { getProductsByTopicRouter } from './get-products-by-topic'

const apiRouter = express.Router()

apiRouter.use('/api', getUserInfoRouter)
apiRouter.use('/api', getJjimsRouter)
apiRouter.use('/api', getProductsByTopicRouter)

export { apiRouter }
