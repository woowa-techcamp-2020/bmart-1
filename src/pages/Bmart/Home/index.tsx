import React from 'react'
import Carousel from 'src/components/Carousel'
import CategoryItem, {
  CategoryItemType,
  categoryNames,
} from 'src/components/CategoryItem'
import SlotMachine from 'src/components/SlotMachine'
import './style.scss'

export type HomeProps = unknown

const Home: React.FC<HomeProps> = () => {
  return (
    <div className="home">
      <SlotMachine>
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
      </SlotMachine>
    </div>
  )
}

export default Home
