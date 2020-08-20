import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
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
  const [subCategory, setSubCategory] = useState<CategoryType>(DEFAULTS.CATEGORY)
  const [sortBy, setSortBy] = useState<SortByType>(DEFAULTS.OPTION)

  return (
    <CategoryDetailsContext.Provider value={{ subCategory, setSubCategory, sortBy, setSortBy }}>
      {children}
    </CategoryDetailsContext.Provider>
  )
}

export const CombineProvider = (...Providers: React.FC[]) => (App: React.FC) =>
  Providers.reduce((acc, Provider) => <Provider>{acc}</Provider>, <App />)

const CategoryDetails: React.FC<CategoryDetailsProps> = ({ category = DEFAULTS.CATEGORY }) => {
  const { subCategory } = useContext(CategoryDetailsContext)
  const [isOpened, setOpened] = useState(false)
  const [optionIdx, setOptionIdx] = useState(0)

  useEffect(() => {}, [subCategory])

  return (
    <div className="category-details">
      <div className="title">
        {category}
        <div className="title-icon" />
      </div>
      <SubCategorySelector category={category} />
      <div className="sort-by" onClick={() => setOpened(true)}>
        <div className="sort-by-icon"></div>
        {DEFAULTS.SORT_OPTIONS[optionIdx]}
      </div>
      <Drawer isOpened={isOpened} setOpened={setOpened}>
        <OptionSelector
          options={DEFAULTS.SORT_OPTIONS.slice()}
          optionIdx={optionIdx}
          setOptionIdx={setOptionIdx}
        ></OptionSelector>
      </Drawer>
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
