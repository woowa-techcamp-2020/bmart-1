import express from 'express'
import { getUserInfoRouter } from './get-user-info'
import { getJjimsRouter } from './get-jjims'

const apiRouter = express.Router()

apiRouter.use('/api', getUserInfoRouter)
apiRouter.use('/api', getJjimsRouter)

export { apiRouter }
