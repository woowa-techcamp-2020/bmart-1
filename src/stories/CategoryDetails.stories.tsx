// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { CATEGORIES } from 'src/constants'
import CategoryDetails, { CategoryDetailsProps } from '../pages/CategoryDetails'
import SubCategorySelector, {
  SubCategorySelectorProps,
} from '../pages/CategoryDetails/SubCategorySelector'

export default {
  title: 'CategoryDetails',
  component: CategoryDetails,
  argTypes: {
    category: {
      control: {
        type: 'select',
        options: CATEGORIES,
      },
    },
  },
} as Meta

const Template: Story<CategoryDetailsProps> = (args) => <CategoryDetails {...args} />

export const Main = Template.bind({})

const SubCategorySelectorTemplate: Story<SubCategorySelectorProps> = (args) => (
  <SubCategorySelector {...args} />
)

export const SubCategories = SubCategorySelectorTemplate.bind({})
