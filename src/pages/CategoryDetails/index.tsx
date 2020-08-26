import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getProductsByCategory } from 'src/apis'
import Drawer from 'src/components/Drawer'
import ArrowUpDownIcon from 'src/components/icons/ArrowUpDownIcon'
import ChevronDownIcon from 'src/components/icons/ChevronDownIcon'
import ProductContainer from 'src/components/ProductContainer'
import { DEFAULTS } from 'src/constants'
import { CategoryType, SortByType } from 'src/types'
import { ProductWithJjimmed } from 'src/types/api'
import OptionSelector from './OptionSelector'
import './style.scss'
import SubCategorySelector from './SubCategorySelector'

export type DispatchByType<T> = Dispatch<SetStateAction<T>>

export type CategoryDetailsProps = {
  category?: CategoryType
}

export const CategoryDetailsContext = createContext<{
  subCategory: string
  sortBy: SortByType
  setSubCategory: DispatchByType<string>
  setSortBy: DispatchByType<SortByType>
}>(undefined)

const Component: React.FC<CategoryDetailsProps> = ({ category }) => {
  const history = useHistory()

  const [sortBy, setSortBy] = useState<string>(DEFAULTS.OPTION)
  const [subCategory, setSubCategory] = useState(null)
  const [isCategoryOpened, setCategoryOpened] = useState<boolean>(false)
  const [isSortByOpened, setSortByOpened] = useState(false)
  const [products, setProducts] = useState<ProductWithJjimmed[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)

  function onLoadMore() {
    setPage((page) => page + 1)
  }

  function setCategory(category) {
    history.push(`/category/${category}`)
  }

  async function getProducts() {
    setLoading(true)
    const newProducts = (await getProductsByCategory({
      category: subCategory,
      page,
      ...sortByResolver(sortBy),
    })) as ProductWithJjimmed[]

    setLoading(false)

    if (page === 1) {
      setProducts(newProducts)
    } else {
      setProducts((prevState) => [...prevState, ...newProducts])
    }
  }

  useEffect(() => {
    if (subCategory === '') return

    setPage(0)
  }, [subCategory, sortBy])

  useEffect(() => {
    if (subCategory === '') return

    setSortBy(DEFAULTS.OPTION)
  }, [subCategory, category])

  useEffect(() => {
    if (page > 0) getProducts()
    else setPage(1)
  }, [page])

  return (
    <div className="category-details">
      <div className="title" onClick={() => setCategoryOpened(true)}>
        {category}
        <ChevronDownIcon />
      </div>
      <SubCategorySelector
        category={category}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
      />
      <div className="sort-by" onClick={() => setSortByOpened(true)}>
        <ArrowUpDownIcon></ArrowUpDownIcon>
        {sortBy}
      </div>
      <ProductContainer
        isSkeletonOn={isLoading}
        products={products}
        onLoadMore={onLoadMore}
      ></ProductContainer>
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

const CategoryDetails: React.FC = () => {
  const { category } = useParams()

  function isValidCategory(): boolean {
    return DEFAULTS.CATEGORIES.indexOf(category) !== -1
  }

  return (
    <>
      {isValidCategory() ? (
        <Component category={category} />
      ) : (
        <div>유효하지 않은 카테고리입니다.</div>
      )}
    </>
  )
}

export default CategoryDetails

function sortByResolver(sortBy) {
  let orderBy = 'createdAt',
    direction = 'asc' as 'asc' | 'desc'

  switch (sortBy) {
    case '기본 정렬':
      orderBy = 'createdAt'
      direction = 'asc'
      break

    case '인기 상품순':
      orderBy = 'createdAt'
      direction = 'desc'
      break

    case '금액 낮은순':
      orderBy = 'price'
      direction = 'asc'
      break

    case '금액 높은순':
      orderBy = 'price'
      direction = 'desc'
      break

    case '신규 상품순':
      orderBy = 'createdAt'
      direction = 'desc'
      break

    case '할인율 순':
      orderBy = 'discount'
      direction = 'desc'
  }

  return {
    sortBy: orderBy,
    direction,
  }
}
