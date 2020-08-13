import { Request, Response, NextFunction } from 'express'
import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { ERROR_MSG } from '~/../constants'
type DecodedData = {
  userId: number
}
export function tokenVerifier() {
  return (req: Request, res: Response, next: NextFunction) => {
    const { token } = req
    try {
      if (!token) throw new Error(ERROR_MSG.NO_TOKEN)
      const { userId } = jwt.verify(token, process.env.TOKEN_SECRET) as DecodedData
      req.auth = {
        userId,
      }
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        req.authMessage = ERROR_MSG.EXPIRED_TOKEN
        return
      }
      req.authMessage = e.message
    } finally {
      next()
    }
  }
}

export function needToken() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.auth) {
      next()
      return
    }
    res.status(401).json({ message: req.authMessage }).end()
  }
}
