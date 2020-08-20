import React, { useContext, useEffect, useState } from 'react'
import { getSubCategories } from 'src/apis'
import { DEFAULTS } from 'src/constants'
import { CategoryType } from 'src/types'
import { CategoryDetailsContext } from '..'
import './style.scss'

export type SubCategorySelectorProps = {
  category: CategoryType
}

const SubCategorySelector: React.FC<SubCategorySelectorProps> = ({
  category = DEFAULTS.CATEGORY,
}) => {
  const [subCategories, setSubCategories] = useState([])
  const { subCategory, setSubCategory } = useContext(CategoryDetailsContext)

  useEffect(() => {
    loadSubCategories(category)
  }, [category])

  async function loadSubCategories(category: string) {
    const newSubCategories = await getSubCategories(category)

    setSubCategories(newSubCategories)
    setSubCategory(newSubCategories[0])
  }

  return (
    <div className="sub-category-selector">
      {subCategories.map((x) => (
        <span
          key={x}
          className={x === subCategory ? 'active' : null}
          onClick={() => {
            return setSubCategory(x)
          }}
        >
          {x}&nbsp;
        </span>
      ))}
    </div>
  )
}

export default SubCategorySelector
