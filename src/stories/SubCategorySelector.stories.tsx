// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { DEFAULTS } from 'src/constants'
import { CategoryDetailsContextProvider } from 'src/pages/CategoryDetails'
import SubCategorySelector, {
  SubCategorySelectorProps,
} from 'src/pages/CategoryDetails/SubCategorySelector'

export default {
  title: 'CategoryDetails/SubCategorySelector',
  component: SubCategorySelector,
  args: {
    category: DEFAULTS.CATEGORY,
  },
  argTypes: {
    category: {
      control: {
        type: 'select',
        options: DEFAULTS.CATEGORIES,
      },
    },
  },
} as Meta

const Template: Story<SubCategorySelectorProps> = (args) => {
  return (
    <CategoryDetailsContextProvider>
      <SubCategorySelector {...args}></SubCategorySelector>
    </CategoryDetailsContextProvider>
  )
}

export const Main = Template.bind({})
