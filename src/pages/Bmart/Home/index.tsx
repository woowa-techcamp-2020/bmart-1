import React from 'react'
import Carousel from 'src/components/Carousel'
import CategoryItem, {
  CategoryItemType,
  categoryNames,
} from 'src/components/CategoryItem'
import './style.scss'

export type HomeProps = unknown

const Home: React.FC<HomeProps> = () => {
  return (
    <div className="home">
      <Carousel />

      <div className="home-content">
        <div className="categories-container">
          {(Object.keys(categoryNames) as CategoryItemType[]).map(
            (category) => (
              <CategoryItem type={category} key={category} />
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
