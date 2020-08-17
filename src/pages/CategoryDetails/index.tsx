import React from 'react'
import { CategoryType } from 'src/types'
import SubCategorySelector from './SubCategorySelector'

export type CategoryDetailsProps = {
  category: CategoryType
}

const CategoryDetails: React.FC<CategoryDetailsProps> = ({ category = '채소' }) => {
  return (
    <div className="categogry-details">
      <div>{category}</div>
      <SubCategorySelector category={category} />
    </div>
  )
}

export default CategoryDetails
