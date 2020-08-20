import React, { createContext, Dispatch, SetStateAction, useState } from 'react'
import Drawer from 'src/components/Drawer'
import { DEFAULTS } from 'src/constants'
import { CategoryType, SortByType } from 'src/types'
import OptionSelector from './OptionSelector'
import './style.scss'
import SubCategorySelector from './SubCategorySelector'

export type DispatchByType<T> = Dispatch<SetStateAction<T>>

export type CategoryDetailsProps = {
  category: CategoryType
  setCategory: (category: CategoryType) => void
}

export const CategoryDetailsContext = createContext<{
  subCategory: string
  sortBy: SortByType
  setSubCategory: DispatchByType<string>
  setSortBy: DispatchByType<SortByType>
}>(undefined)

const CategoryDetails: React.FC<CategoryDetailsProps> = ({
  category = DEFAULTS.CATEGORY as CategoryType,
  setCategory,
}) => {
  const [sortBy, setSortBy] = useState<string>(DEFAULTS.OPTION)
  const [subCategory, setSubCategory] = useState(null)
  const [isCategoryOpened, setCategoryOpened] = useState<boolean>(false)
  const [isSortByOpened, setSortByOpened] = useState(false)

  return (
    <div className="category-details">
      <div className="title" onClick={() => setCategoryOpened(true)}>
        {category}
        <div className="title-icon" />
      </div>
      <SubCategorySelector
        category={category}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
      />
      <div className="sort-by" onClick={() => setSortByOpened(true)}>
        <div className="sort-by-icon"></div>
        {sortBy}
      </div>
      <Drawer isOpened={isCategoryOpened} setOpened={setCategoryOpened}>
        <OptionSelector
          options={DEFAULTS.CATEGORIES.slice()}
          option={category}
          setOption={setCategory}
        ></OptionSelector>
      </Drawer>
      <Drawer isOpened={isSortByOpened} setOpened={setSortByOpened}>
        <OptionSelector
          options={DEFAULTS.SORT_OPTIONS.slice()}
          setOption={setSortBy}
        ></OptionSelector>
      </Drawer>
    </div>
  )
}

export default CategoryDetails
