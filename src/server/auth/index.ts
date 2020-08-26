import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import { Strategy } from 'passport-github'
import { prisma } from '~/utils/prisma'
import { STATUS_CODE } from './../../constants/index'

dotenv.config()
const clientID = process.env.GITHUB_CLIENT_ID || ''
const clientSecret = process.env.GITHUB_CLIENT_SECRET || ''
const callbackURL = process.env.GITHUB_CALLBACK_URL || ''

export const authRouter = express.Router()

authRouter.use(passport.initialize())
passport.use(
  new Strategy(
    {
      clientID,
      clientSecret,
      callbackURL,
    },
    async (token, _, profile, done) => {
      const name = profile.displayName
      const email = profile.emails?.map((x) => x.value).find(() => true) ?? ''
      const profileImg =
        profile.photos?.map((x) => x.value).find(() => true) ?? ''

      await prisma.user.upsert({
        create: {
          email,
          name,
          profileImg,
          token,
        },
        update: {
          profileImg,
          token,
        },
        where: {
          email,
        },
      })
      const user = await prisma.user.findOne({
        where: {
          email,
        },
      })

      done(null, { userId: user.id })
    }
  )
)

authRouter.get('/login', passport.authenticate('github', { session: false }))
authRouter.get('/logout', (req, res) => {
  req.logout()
  res.sendStatus(STATUS_CODE.OK).end()
})
authRouter.get(
  '/callback',
  passport.authenticate('github', { session: false }),
  (req: Request, res: Response) => {
    const token = jwt.sign(req.user || '', process.env.TOKEN_SECRET)

    res.redirect(`${process.env.CLIENT_FALLBACK ?? ''}/verified?token=${token}`)
  }
)
