import express from 'express'
import { getUserInfoRouter } from './get-user-info'

const apiRouter = express.Router()

apiRouter.use('/api', getUserInfoRouter)

export { apiRouter }
