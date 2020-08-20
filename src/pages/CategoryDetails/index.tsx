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

export const CategoryDetailsContextProvider: React.FC = ({ children }) => {
  const [subCategory, setSubCategory] = useState<CategoryType>(
    DEFAULTS.CATEGORY
  )
  const [sortBy, setSortBy] = useState<SortByType>(DEFAULTS.OPTION)

  return (
    <CategoryDetailsContext.Provider
      value={{ subCategory, setSubCategory, sortBy, setSortBy }}
    >
      {children}
    </CategoryDetailsContext.Provider>
  )
}

const CategoryDetails: React.FC<CategoryDetailsProps> = ({
  category = DEFAULTS.CATEGORY,
}) => {
  const [isOpened, setOpened] = useState(false)
  const [sortBy, setSortBy] = useState<string>(DEFAULTS.OPTION)
  const [subCategory, setSubCategory] = useState(null)

  return (
    <div className="category-details">
      <div className="title">
        {category}
        <div className="title-icon" />
      </div>
      <SubCategorySelector
        category={category}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
      />
      <div className="sort-by" onClick={() => setOpened(true)}>
        <div className="sort-by-icon"></div>
        {sortBy}
      </div>
      <Drawer isOpened={isOpened} setOpened={setOpened}>
        <OptionSelector
          options={DEFAULTS.SORT_OPTIONS.slice()}
          setOption={setSortBy}
        ></OptionSelector>
      </Drawer>
    </div>
  )
}

export default CategoryDetails
