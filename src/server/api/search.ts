import express from 'express'
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

searchRouter.get('/search', async (req, res) => {
  const searchTerm = req.query.term as string
  const queryCondition = getQueryCondition('name', searchTerm)

  try {
    const result = await prisma.$queryRaw(`
    SELECT * FROM product WHERE ${queryCondition}
  `)

    res.json(result)
  } catch (err) {
    console.error(err)

    res.sendStatus(500)
  }
})

export { searchRouter }
