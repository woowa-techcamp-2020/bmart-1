import React, { useEffect, useState } from 'react'
import { getSubCategories } from 'src/apis'
import { CategoryDetailsProps } from '..'
import './style.scss'

export type SubCategorySelectorProps = CategoryDetailsProps

const SubCategorySelector: React.FC<SubCategorySelectorProps> = ({ category = '채소' }) => {
  const [subCategories, setSubCategories] = useState([])
  const [subCategory, setSubCategory] = useState(null)

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
          onClick={() => setSubCategory(x)}
        >
          {x}&nbsp;
        </span>
      ))}
    </div>
  )
}

export default SubCategorySelector
