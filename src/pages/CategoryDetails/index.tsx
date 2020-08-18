import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
import { CategoryType, SortByType } from 'src/types'
import './style.scss'
import SubCategorySelector from './SubCategorySelector'

type DispatchByType<T> = Dispatch<SetStateAction<T>>

export type CategoryDetailsProps = {
  category: CategoryType
}

export const CategoryDetailsContext = createContext<{
  subCategory: string
  sortBy: SortByType
  setSubCategory: DispatchByType<string>
  setSortBy: DispatchByType<SortByType>
}>(undefined)

export const CategoryDetailsContextProvider: React.FC = ({ children }) => {
  const [subCategory, setSubCategory] = useState<CategoryType>('채소')
  const [sortBy, setSortBy] = useState<SortByType>('기본 정렬')

  return (
    <CategoryDetailsContext.Provider value={{ subCategory, setSubCategory, sortBy, setSortBy }}>
      {children}
    </CategoryDetailsContext.Provider>
  )
}

export const CombineProvider = (...Providers: React.FC[]) => (App: React.FC) =>
  Providers.reduce((acc, Provider) => <Provider>{acc}</Provider>, <App />)

const CategoryDetails: React.FC<CategoryDetailsProps> = ({ category = '채소' }) => {
  const { subCategory } = useContext(CategoryDetailsContext)

  return (
    <div className="category-details">
      <div className="title">{category}</div>
      <SubCategorySelector category={category} />
      <div>{subCategory}</div>
    </div>
  )
}

export default (props: CategoryDetailsProps) => {
  return (
    <CategoryDetailsContextProvider>
      <CategoryDetails {...props}></CategoryDetails>
    </CategoryDetailsContextProvider>
  )
}
