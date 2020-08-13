import express from 'express'
import { getUserInfoRouter } from './get-user-info'
import { needToken } from '~/middlewares'

const apiRouter = express.Router()

apiRouter.use(needToken())
apiRouter.use('/api', getUserInfoRouter)

export { apiRouter }
