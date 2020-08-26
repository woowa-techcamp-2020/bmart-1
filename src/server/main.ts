import appRoot from 'app-root-path'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import bearerToken from 'express-bearer-token'
import morgan from 'morgan'
import { isDev } from './../utils'
import { apiRouter } from './api'
import { authRouter } from './auth'
import { tokenVerifier } from './middlewares'

const app = express()
const port = 13100

dotenv.config()

if (isDev) {
  app.use(cors())
  app.use(morgan('dev'))
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bearerToken())
app.use(tokenVerifier())

if (!isDev) {
  app.use(express.static(appRoot.resolve('/build')))
}

app.use('/auth', authRouter)
app.use('/api', apiRouter)

if (!isDev) {
  app.get('*', (req, res) => res.sendFile(appRoot.resolve('/build/index.html')))
}

app.listen(port, () => console.log(`Listening on port ${port}`))
