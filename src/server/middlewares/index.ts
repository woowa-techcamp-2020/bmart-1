import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({
  path: path.resolve('./prisma/.env'),
})
type DecodedData = {
  userId: number
}
export function tokenVerifier() {
  return (req: Request, res: Response, next: NextFunction) => {
    const { token } = req
    try {
      if (!token) throw new Error()
      const { userId } = jwt.verify(token, process.env.TOKEN_SECRET) as DecodedData
      req.auth = {
        userId,
      }
    } finally {
      next()
    }
  }
}
