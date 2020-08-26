// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import CategoryDetails, { CategoryDetailsProps } from '../pages/CategoryDetails'

export default {
  title: 'CategoryDetails',
  component: CategoryDetails,
} as Meta

const Template: Story<CategoryDetailsProps> = (args) => {
  return <CategoryDetails />
}

export const Main = Template.bind({})
