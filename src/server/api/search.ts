import { Product } from '@prisma/client'
import express, { Request, Response } from 'express'
import { query } from 'express-validator'
import { ERROR_MSG, STATUS_CODE } from '~/../constants'
import { SearchApiRequestQuery, SearchApiResponse } from '~/../types/api'
import { requestValidator } from '~/middlewares'
import { prisma } from '../utils/prisma'

const searchRouter = express.Router()

function getInsertionCondition(field: string, term: string, index: number) {
  return `${field} LIKE '%${term.substring(0, index)}_${term.substring(
    index
  )}%'`
}

function getDeletionCondition(field: string, term: string, index: number) {
  return `${field} LIKE '%${term.substring(0, index)}_${term.substring(
    index
  )}%'`
}

function getSubstitutionCondition(field: string, term: string, index: number) {
  return `${field} LIKE '%${term.substring(0, index)}${term.substring(
    index + 1
  )}%'`
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

const amountOfPage = 30

searchRouter.get(
  '/search',
  [
    query('term').notEmpty().isString(),
    query('page').optional().toInt().isInt(),
    requestValidator(),
  ],
  async (
    req: Request<{}, {}, {}, SearchApiRequestQuery>,
    res: Response<SearchApiResponse>
  ) => {
    const term = req.query.term.trim()
    const page = req.query.page ?? 0
    const queryCondition = getQueryCondition('name', term)
    const userId = req.auth?.userId

    try {
      let queryStr

      if (userId)
        queryStr = `
          SELECT product.*,
            CASE WHEN jjim.userId IS NOT NULL THEN true ELSE false
            END AS isJjimmed
          FROM product LEFT JOIN jjim ON product.id = jjim.productId
          WHERE ${queryCondition} 
            AND (jjim.userId is null OR jjim.userId = ${userId})
          LIMIT ${amountOfPage}
          OFFSET ${amountOfPage * page}
        `
      else
        queryStr = `
          SELECT * FROM product
          WHERE ${queryCondition}
          LIMIT ${amountOfPage}
          OFFSET ${amountOfPage * page}
        `

      const products = (await prisma.$queryRaw(queryStr)) as (Product & {
        isJjimmed: number
      })[]

      if (userId) {
        const productsWithJjimmed = products.map((product) => {
          const { isJjimmed, ...productInfo } = product

          return { ...productInfo, isJjimmed: Boolean(isJjimmed) }
        })

        res.json(productsWithJjimmed)

        return
      }

      res.json(products)
    } catch (e) {
      console.error(e)

      res
        .status(STATUS_CODE.INTERNAL_ERROR)
        .send({ message: ERROR_MSG.INTERNAL_ERROR })
    }
  }
)

export { searchRouter }
