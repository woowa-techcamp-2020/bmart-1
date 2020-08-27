import $ from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
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

let mockBlocks = []

function shuffle() {
  const mocks = [7, 4, 3, 2, 5, 4, 4, 6]

  mockBlocks = mocks.map(() => mocks[Math.floor(Math.random() * mocks.length)])
}

const SubCategorySelector: React.FC<SubCategorySelectorProps> = ({
  category = DEFAULTS.CATEGORY,
  subCategory = null,
  isLoading: isInitLoading = false,
  setSubCategory,
}) => {
  const [subCategories, setSubCategories] = useState([])
  const [isLoading, setLoading] = useState<boolean>(isInitLoading)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    setSubCategory && setSubCategory(null)
    setSubCategories && setSubCategories([])
  }, [category])

  useEffect(() => {
    if (subCategory === null) setSubCategory && loadSubCategories()
  }, [subCategory])

  useEffect(() => {
    return () => {
      clearTimeout(timer.current)
    }
  }, [])

  async function loadSubCategories() {
    shuffle()
    setLoading(true)
    const newSubCategories = await getSubCategories(category)

    timer.current = setTimeout(() => {
      setLoading(false)
    }, 200)

    setSubCategories(newSubCategories)

    if (subCategory === null) setSubCategory(newSubCategories[0])
  }

  return (
    <div className="sub-category-selector">
      {isLoading
        ? mockBlocks.map((x, i) => (
            <span className="mock" key={i}>
              {new Array(x).fill('김').join('')}
            </span>
          ))
        : subCategories.map((x, i) => (
            <span
              key={i}
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
