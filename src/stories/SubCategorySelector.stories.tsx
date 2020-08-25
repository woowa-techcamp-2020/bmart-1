// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0'
import React, { useState } from 'react'
import { DEFAULTS } from 'src/constants'
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
  const [subCategory, setSubCategory] = useState(null)

  return (
    <SubCategorySelector
      {...args}
      subCategory={subCategory}
      setSubCategory={setSubCategory}
    ></SubCategorySelector>
  )
}

export const Main = Template.bind({})

const MockTemplate: Story<SubCategorySelectorProps> = (args) => {
  return <SubCategorySelector {...args} isLoading={true}></SubCategorySelector>
}

export const LazyLoading = MockTemplate.bind({})
