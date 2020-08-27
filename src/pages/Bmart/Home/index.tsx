import React from 'react'
import packageJson from 'src/../package.json'
import Carousel from 'src/components/Carousel'
import CategoryItem, {
  CategoryItemType,
  categoryNames,
} from 'src/components/CategoryItem'
import SlotMachine from 'src/components/SlotMachine'
import './style.scss'
import TopicContainer from './TopicContainer'

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

        <TopicContainer title="🤔 지금 뭐 먹지?" type="now"></TopicContainer>
        <TopicContainer title="🎉 새로 나왔어요" type="new"></TopicContainer>

        <div className="version">
          <a href="https://github.com/woowa-techcamp-2020/bmart-1">
            <div className="label">v{packageJson.version}</div>
          </a>
        </div>
      </SlotMachine>
    </div>
  )
}

export default Home
