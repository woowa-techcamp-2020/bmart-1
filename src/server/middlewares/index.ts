import { Request, Response, NextFunction } from 'express'
import jwt, { TokenExpiredError } from 'jsonwebtoken'
type DecodedData = {
  userId: number
}
export function tokenVerifier() {
  return (req: Request, res: Response, next: NextFunction) => {
    const { token } = req
    try {
      if (!token) throw new Error('토큰 정보가 존재하지 않습니다.')
      const { userId } = jwt.verify(token, process.env.TOKEN_SECRET) as DecodedData
      req.auth = {
        userId,
      }
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        req.authMessage = '만료된 토큰입니다.'
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
