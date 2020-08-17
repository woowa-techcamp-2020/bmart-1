import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
import { CategoryType, SortByType } from 'src/types'
import './style.scss'
import SubCategorySelector from './SubCategorySelector'

type DispatchByType<T> = Dispatch<SetStateAction<T>>

export type CategoryDetailsProps = {
  category: CategoryType
}

export const CategoryContext = createContext<{
  category: CategoryType
  setCategory: DispatchByType<CategoryType>
}>(undefined)

export const SubCategoryContext = createContext<{
  subCategory: string
  setSubCategory: DispatchByType<string>
}>(undefined)

export const SortByContext = createContext<{
  sortBy: SortByType
  setSortBy: DispatchByType<SortByType>
}>(undefined)

export const CategoryContextProvider: React.FC = ({ children }) => {
  const [category, setCategory] = useState<CategoryType>('채소')

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  )
}

export const SubCategoryContextProvider: React.FC = ({ children }) => {
  const [subCategory, setSubCategory] = useState<string>('')

  return (
    <SubCategoryContext.Provider value={{ subCategory, setSubCategory }}>
      {children}
    </SubCategoryContext.Provider>
  )
}

export const SortByContextProvider: React.FC = ({ children }) => {
  const [sortBy, setSortBy] = useState<SortByType>('기본 정렬')

  return <SortByContext.Provider value={{ sortBy, setSortBy }}>{children}</SortByContext.Provider>
}

export const CombineProvider = (...Providers: React.FC[]) => (App: React.FC) =>
  Providers.reduce((acc, Provider) => <Provider>{acc}</Provider>, <App />)

const CategoryDetails: React.FC<CategoryDetailsProps> = ({ category = '채소' }) => {
  const { subCategory } = useContext(SubCategoryContext)

  return (
    <div className="category-details">
      <div className="title">{category}</div>
      <SubCategorySelector category={category} />
      <div>{subCategory}</div>
    </div>
  )
}

const Component: React.FC<CategoryDetailsProps> = () => {
  return CombineProvider(
    CategoryContextProvider,
    SubCategoryContextProvider,
    SortByContextProvider
  )(CategoryDetails)
}

export default Component
