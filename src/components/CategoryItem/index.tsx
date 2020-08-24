import React from 'react'
import './style.scss'

export const categoryNames = {
  electronic: {
    label: '전자제품',
    img: require('src/assets/images/categories/refrigerator.png'),
    color: '#919399',
  },
  healthy: {
    label: '건강식품',
    img: require('src/assets/images/categories/hongsam.png'),
    color: '#C85757',
  },
  fruit: {
    label: '과일·견과·쌀',
    img: require('src/assets/images/categories/avocado.png'),
    color: '#86A608',
  },
  dish: {
    label: '국·반찬·메인요리',
    img: require('src/assets/images/categories/dish.png'),
    color: '#E96302',
  },
  condiment: {
    label: '면·양념·오일',
    img: require('src/assets/images/categories/sauce.png'),
    color: '#B23D18',
  },
  pets: {
    label: '반려동물',
    img: require('src/assets/images/categories/pets.png'),
    color: '#AC7955',
  },
  kids: {
    label: '베이비·키즈',
    img: require('src/assets/images/categories/rubberduck.png'),
    color: '#ADB00C',
  },
  bakery: {
    label: '베이커리·치즈·델리',
    img: require('src/assets/images/categories/bread.png'),
    color: '#FFBB55',
  },
  beauty: {
    label: '뷰티·바디케어',
    img: require('src/assets/images/categories/perfume.png'),
    color: '#EF9C9C',
  },
  salad: {
    label: '샐러드·간편식',
    img: require('src/assets/images/categories/salad.png'),
    color: '#4DA517',
  },
  living: {
    label: '생활용품·리빙',
    img: require('src/assets/images/categories/shelf.png'),
    color: '#61D1B6',
  },
  marine: {
    label: '수산·해산·건어물',
    img: require('src/assets/images/categories/fish.png'),
    color: '#4392EE',
  },
}

export type CategoryItemType = keyof typeof categoryNames

export type CategoryItemProps = {
  type: CategoryItemType
}

const CategoryItem: React.FC<CategoryItemProps> = ({ type }) => {
  return (
    <div className="category-item">
      <img src={categoryNames[type].img} className="category-image" />
      <h1
        className="category-name"
        style={{
          color: categoryNames[type].color,
        }}
      >
        {categoryNames[type].label.split('·').join('\n')}
      </h1>
    </div>
  )
}

export default CategoryItem
