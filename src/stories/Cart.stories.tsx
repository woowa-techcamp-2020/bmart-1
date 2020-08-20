import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import Cart, { CartProps } from '../pages/Cart'

export default {
  title: 'CartPage',
  component: Cart,
} as Meta

const Template: Story<CartProps> = (args) => <Cart {...args} />

export const CartTest = Template.bind({})
