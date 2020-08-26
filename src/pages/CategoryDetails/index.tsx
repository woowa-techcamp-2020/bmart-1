import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Drawer from 'src/components/Drawer'
import ArrowUpDownIcon from 'src/components/icons/ArrowUpDownIcon'
import ChevronDownIcon from 'src/components/icons/ChevronDownIcon'
import { DEFAULTS } from 'src/constants'
import { SortByType } from 'src/types'
import OptionSelector from './OptionSelector'
import './style.scss'
import SubCategorySelector from './SubCategorySelector'

export type DispatchByType<T> = Dispatch<SetStateAction<T>>

// export type CategoryDetailsProps = {
//   category: CategoryType
//   setCategory: (category: CategoryType) => void
// }
export type CategoryDetailsProps = unknown

export const CategoryDetailsContext = createContext<{
  subCategory: string
  sortBy: SortByType
  setSubCategory: DispatchByType<string>
  setSortBy: DispatchByType<SortByType>
}>(undefined)

const CategoryDetails: React.FC<CategoryDetailsProps> = () => {
  const { slug } = useParams()
  const history = useHistory()

  const [sortBy, setSortBy] = useState<string>(DEFAULTS.OPTION)
  const [subCategory, setSubCategory] = useState(null)
  const [isCategoryOpened, setCategoryOpened] = useState<boolean>(false)
  const [isSortByOpened, setSortByOpened] = useState(false)

  useEffect(() => {
    if ([...DEFAULTS.CATEGORIES].indexOf(slug) == -1) {
      alert('유효하지 않은 주소입니다.')
    }
  }, [slug])

  function setCategory(category) {
    history.replace(`/category/${category}`)
  }

  return (
    <div className="category-details">
      <div className="title" onClick={() => setCategoryOpened(true)}>
        {slug}
        <ChevronDownIcon />
      </div>
      <SubCategorySelector
        category={slug}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
      />
      <div className="sort-by" onClick={() => setSortByOpened(true)}>
        <ArrowUpDownIcon></ArrowUpDownIcon>
        {sortBy}
      </div>
      <Drawer isOpened={isCategoryOpened} setOpened={setCategoryOpened}>
        <OptionSelector
          options={DEFAULTS.CATEGORIES.slice()}
          option={slug}
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
