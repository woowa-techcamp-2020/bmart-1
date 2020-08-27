import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { ERROR_MSG, STATUS_CODE } from '~/../constants'

type DecodedData = {
  userId: number
}

export function tokenVerifier() {
  return (req: Request, res: Response, next: NextFunction) => {
    const { token } = req

    try {
      if (!token) throw new Error(ERROR_MSG.NO_TOKEN)

      const { userId } = jwt.verify(
        token,
        process.env.TOKEN_SECRET
      ) as DecodedData

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

    res.status(STATUS_CODE.NO_TOKEN).json({ message: req.authMessage }).end()
  }
}

export function requestValidator<B = {}, Q = {}>() {
  return (
    req: Request<{}, {}, B, Q>,
    res: Response,
    next: NextFunction
  ): void => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({
          message: `${ERROR_MSG.BAD_REQUEST} ${errors
            .array()
            .map(({ value, msg, param }) => `${msg} ${value} for ${param}`)}`,
        })
        .end()

      return
    }

    next()
  }
}
