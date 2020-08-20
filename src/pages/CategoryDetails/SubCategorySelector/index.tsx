import React, { useEffect, useState } from 'react'
import { getSubCategories } from 'src/apis'
import { DEFAULTS } from 'src/constants'
import { CategoryType } from 'src/types'
import './style.scss'

export type SubCategorySelectorProps = {
  category: CategoryType
  subCategory: string
  setSubCategory: (subCategory: string) => void
}

const SubCategorySelector: React.FC<SubCategorySelectorProps> = ({
  category = DEFAULTS.CATEGORY,
  subCategory,
  setSubCategory,
}) => {
  const [subCategories, setSubCategories] = useState([])

  useEffect(() => {
    loadSubCategories(category)
  }, [category])

  async function loadSubCategories(newCategory: string) {
    const newSubCategories = await getSubCategories(newCategory)

    setSubCategories(newSubCategories)

    if (newCategory !== category || !subCategory)
      setSubCategory(newSubCategories[0])
  }

  return (
    <div className="sub-category-selector">
      {subCategories.map((x) => (
        <span
          key={x}
          className={x === subCategory ? 'active' : null}
          onClick={() => setSubCategory(x)}
        >
          {x}&nbsp;
        </span>
      ))}
    </div>
  )
}

export default SubCategorySelector
