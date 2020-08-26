import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
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

      console.log('hi')
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
          email: email,
        },
      })
      console.log('done!', name, email, profileImg)

      await prisma.$disconnect()
      done(null, profile)
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
    const userId = req.auth?.userId

    console.log(req.user)

    console.log('done!!')
    res.send({ login: 'OK', userId: req.user })
  }
)
