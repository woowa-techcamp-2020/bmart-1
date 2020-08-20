import React, { useState } from 'react'
import { DEFAULTS } from 'src/constants'
import CategoryDetails from 'src/pages/CategoryDetails'
import { CategoryType } from 'src/types'
import './style.scss'

export type SaleProps = unknown

const Sale: React.FC<SaleProps> = (props) => {
  const [category, setCategory] = useState<CategoryType>(
    DEFAULTS.CATEGORY as CategoryType
  )

  return (
    <CategoryDetails
      category={category}
      setCategory={setCategory}
    ></CategoryDetails>
  )
}

export default Sale
