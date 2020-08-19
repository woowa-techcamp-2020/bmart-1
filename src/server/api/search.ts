import express, { Request, Response } from 'express'
import { query } from 'express-validator'
import { ERROR_MSG, STATUS_CODE } from '~/../constants'
import { SearchApiRequestQuery, SearchApiResponse } from '~/../types/api'
import { requestValidator } from '~/middlewares'
import { prisma } from '../utils/prisma'

const searchRouter = express.Router()

function getInsertionCondition(field: string, term: string, index: number) {
  return `${field} LIKE '%${term.substring(0, index)}_${term.substring(index)}%'`
}

function getDeletionCondition(field: string, term: string, index: number) {
  return `${field} LIKE '%${term.substring(0, index)}_${term.substring(index)}%'`
}

function getSubstitutionCondition(field: string, term: string, index: number) {
  return `${field} LIKE '%${term.substring(0, index)}${term.substring(index + 1)}%'`
}

function getQueryCondition(field: string, term: string) {
  const conditions: Array<string> = []

  for (let i = 0; i <= term.length; i++) {
    conditions.push(getDeletionCondition(field, term, i))

    if (i === term.length) continue

    conditions.push(getInsertionCondition(field, term, i))
    conditions.push(getSubstitutionCondition(field, term, i))
  }

  return conditions.join(' OR ')
}

searchRouter.get(
  '/search',
  [query('term').notEmpty().isString()],
  requestValidator(),
  async (req: Request<{}, {}, {}, SearchApiRequestQuery>, res: Response<SearchApiResponse>) => {
    const term = req.query.term.trim()
    const queryCondition = getQueryCondition('name', term)

    try {
      const products = await prisma.$queryRaw(`SELECT * FROM product WHERE ${queryCondition}`)

      res.json(products)
    } catch (e) {
      console.error(e)

      res.status(STATUS_CODE.INTERNAL_ERROR).send({ message: ERROR_MSG.INTERNAL_ERROR })
    }
  }
)

export { searchRouter }
