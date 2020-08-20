import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import Cart, { CartProps } from '../pages/Cart'

export default {
  title: 'CartPage',
  component: Cart,
  args: {
    productsInCart: [
      {
        userId: 15,
        productId: 9566,
        quantity: 3,
        addedAt: '2020-08-20T00:02:04.000Z',
        product: {
          id: 9566,
          name: '친환경 얼갈이 & 열무 2종',
          description: '찬바람이 불 때 더 맛있는 채소 (1봉 300g)',
          defaultPrice: 1800,
          price: 1800,
          discount: 0,
          category: '채소',
          imgV: 'https://img-cf.kurly.com/shop/data/goods/1470278013934l0.jpg',
          imgH: 'https://img-cf.kurly.com/shop/data/goods/1460729715654z0.jpg',
          createdAt: '2020-08-15T08:55:00.000Z',
          subcategory: '기본채소',
        },
      },
      {
        userId: 15,
        productId: 9567,
        quantity: 1,
        addedAt: '2020-08-15T14:10:20.000Z',
        product: {
          id: 9567,
          name: '이유식 재료 친환경 적양배추 1/4통',
          description: '신선하게 담은 보랏빛 영양의 적채(1/4통)',
          defaultPrice: 1700,
          price: 1700,
          discount: 0,
          category: '채소',
          imgV: 'https://img-cf.kurly.com/shop/data/goods/1585893200939l0.jpg',
          imgH: 'https://img-cf.kurly.com/shop/data/goods/1585893200182z0.jpg',
          createdAt: '2020-08-15T08:34:39.000Z',
          subcategory: '기본채소',
        },
      },
      {
        userId: 15,
        productId: 9568,
        quantity: 3,
        addedAt: '2020-08-20T00:03:40.000Z',
        product: {
          id: 9568,
          name: '영양 부추 150g',
          description: '씹는 맛이 살아있는 영양 부추(1봉/150g)',
          defaultPrice: 3490,
          price: 3490,
          discount: 0,
          category: '채소',
          imgV: 'https://img-cf.kurly.com/shop/data/goods/1559270914907l0.jpg',
          imgH: 'https://img-cf.kurly.com/shop/data/goods/1559270914554z0.jpg',
          createdAt: '2020-08-15T08:39:20.000Z',
          subcategory: '기본채소',
        },
      },
      {
        userId: 15,
        productId: 9931,
        quantity: 3,
        addedAt: '2020-08-19T23:59:58.000Z',
        product: {
          id: 9931,
          name: '복분자 300g (냉동)',
          description: '계절이 빚어낸 검붉은 원석',
          defaultPrice: 9900,
          price: 9900,
          discount: 0,
          category: '과일·견과·쌀',
          imgV: 'https://img-cf.kurly.com/shop/data/goods/1591945877737l0.jpg',
          imgH: 'https://img-cf.kurly.com/shop/data/goods/1591945877331z0.jpg',
          createdAt: '2020-08-15T08:47:58.000Z',
          subcategory: '국산과일',
        },
      },
    ],
  },
} as Meta

const Template: Story<CartProps> = (args) => <Cart {...args} />

export const CartTest = Template.bind({})
