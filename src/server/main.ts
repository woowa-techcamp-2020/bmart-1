import express from 'express'
import { apiRouter } from './api'
import bearerToken from 'express-bearer-token'
import { tokenVerifier } from './middlewares'
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bearerToken())
app.use(tokenVerifier())

app.use(apiRouter)

app.listen(port, () => console.log(`Listening on port ${port}`))
