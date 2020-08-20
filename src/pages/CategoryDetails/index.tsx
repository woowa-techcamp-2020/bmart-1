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
type DrawerType = 'sortBy' | 'category' | null

const CategoryDetails: React.FC<CategoryDetailsProps> = ({
  category = DEFAULTS.CATEGORY as CategoryType,
  setCategory,
}) => {
  const [drawerType, openDrawer] = useState<DrawerType>(null)
  const [sortBy, setSortBy] = useState<string>(DEFAULTS.OPTION)
  const [subCategory, setSubCategory] = useState(null)

  return (
    <div className="category-details">
      <div className="title" onClick={() => openDrawer('category')}>
        {category}
        <div className="title-icon" />
      </div>
      <SubCategorySelector
        category={category}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
      />
      <div className="sort-by" onClick={() => openDrawer('sortBy')}>
        <div className="sort-by-icon"></div>
        {sortBy}
      </div>
      <Drawer isOpened={drawerType !== null} setOpened={() => openDrawer(null)}>
        <OptionSelector
          options={
            drawerType === 'category'
              ? DEFAULTS.CATEGORIES.slice()
              : DEFAULTS.SORT_OPTIONS.slice()
          }
          setOption={drawerType === 'category' ? setCategory : setSortBy}
        ></OptionSelector>
      </Drawer>
    </div>
  )
}

export default CategoryDetails
