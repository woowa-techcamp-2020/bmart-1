import { prisma } from '../utils/prisma'
import express, { Request, Response } from 'express'
import { Jjim } from '@prisma/client'
import { ErrorResponse } from '~/types/res'
import { STATUS_CODE, ERROR_MSG } from '~/../constants'
import { query } from 'express-validator'

const getSubCategoriesRouter = express.Router()

export type GetSubCategoriesApiResponse = string[] | ErrorResponse

getSubCategoriesRouter.get(
  '/get-sub-categories',
  [query('category').exists()],
  async (req: Request, res: Response<GetSubCategoriesApiResponse>) => {
    const category = req.query.category

    // TODO: validate category and handling mysql injection

    try {
      const subCategories = await prisma.$queryRaw(
        `SELECT DISTINCT(subcategory) FROM product WHERE category="${category}"`
      )

      res.send(subCategories.map((x: { subcategory: string }) => x.subcategory))
    } catch (e) {
      console.error(e)
      res.status(STATUS_CODE.INTERNAL_ERROR).send({ message: ERROR_MSG.INTERNAL_ERROR })
    }
  }
)

export { getSubCategoriesRouter }
