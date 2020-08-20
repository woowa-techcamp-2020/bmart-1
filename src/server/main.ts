import appRoot from 'app-root-path'
import dotenv from 'dotenv'
import express from 'express'
import bearerToken from 'express-bearer-token'
import { apiRouter } from './api'
import { tokenVerifier } from './middlewares'

const app = express()
const port = 13100

dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bearerToken())
app.use(tokenVerifier())

app.use(express.static(appRoot.resolve('/build')))

app.use('/api', apiRouter)

app.get('*', (req, res) => res.sendFile(appRoot.resolve('/build/index.html')))

app.listen(port, () => console.log(`Listening on port ${port}`))
