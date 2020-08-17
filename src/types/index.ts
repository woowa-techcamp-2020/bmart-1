import { CATEGORIES } from './../constants'
import { SORT_BY_TYPES } from './../constants/index'

export type CategoryType = typeof CATEGORIES[number]

export type SortByType = typeof SORT_BY_TYPES[number]
