import $ from 'classnames'
import React, { useEffect, useState } from 'react'
import { getSubCategories } from 'src/apis'
import { DEFAULTS } from 'src/constants'
import { CategoryType } from 'src/types'
import './style.scss'

export type SubCategorySelectorProps = {
  category: CategoryType
  subCategory?: string
  setSubCategory: (subCategory: string) => void
}

const SubCategorySelector: React.FC<SubCategorySelectorProps> = ({
  category = DEFAULTS.CATEGORY,
  subCategory = null,
  setSubCategory,
}) => {
  const [subCategories, setSubCategories] = useState([])

  useEffect(() => {
    setSubCategory(null)
    setSubCategories([])
  }, [category])

  useEffect(() => {
    loadSubCategories()
  }, [subCategory])

  async function loadSubCategories() {
    const newSubCategories = await getSubCategories(category)

    setSubCategories(newSubCategories)

    if (subCategory === null) setSubCategory(newSubCategories[0])
  }

  return (
    <div className="sub-category-selector">
      {subCategories.map((x) => (
        <span
          key={x}
          className={$({ active: x === subCategory })}
          onClick={() => setSubCategory(x)}
        >
          {x}&nbsp;
        </span>
      ))}
    </div>
  )
}

export default SubCategorySelector
