import $ from 'classnames'
import React, { useEffect, useState } from 'react'
import { getSubCategories } from 'src/apis'
import { DEFAULTS } from 'src/constants'
import { CategoryType } from 'src/types'
import './style.scss'

export type SubCategorySelectorProps = {
  category?: CategoryType
  subCategory?: string
  isLoading?: boolean
  setSubCategory?: (subCategory: string) => void
}

const mockBlocks = [14, 5, 7, 12, 6, 4, 7, 2, 6]

const SubCategorySelector: React.FC<SubCategorySelectorProps> = ({
  category = DEFAULTS.CATEGORY,
  subCategory = null,
  isLoading = false,
  setSubCategory,
}) => {
  const [subCategories, setSubCategories] = useState([])

  useEffect(() => {
    setSubCategory && setSubCategory(null)
    setSubCategories && setSubCategories([])
  }, [category])

  useEffect(() => {
    setSubCategory && loadSubCategories()
  }, [subCategory])

  async function loadSubCategories() {
    const newSubCategories = await getSubCategories(category)

    setSubCategories(newSubCategories)

    if (subCategory === null) setSubCategory(newSubCategories[0])
  }

  return (
    <div className="sub-category-selector">
      {isLoading
        ? mockBlocks.map((x, i) => (
            <>
              <span className="mock" key={i}>
                {new Array(x).fill('김').join('')}
              </span>
              <span>&nbsp;</span>
            </>
          ))
        : subCategories.map((x) => (
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
