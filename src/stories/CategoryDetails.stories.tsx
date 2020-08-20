// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0'
import React, { useState } from 'react'
import { DEFAULTS } from 'src/constants'
import { CategoryType } from 'src/types'
import CategoryDetails, { CategoryDetailsProps } from '../pages/CategoryDetails'

export default {
  title: 'CategoryDetails',
  component: CategoryDetails,
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

const Template: Story<CategoryDetailsProps> = (args) => {
  const [category, setCategory] = useState<CategoryType>(args.category)

  return <CategoryDetails category={category} setCategory={setCategory} />
}

export const Main = Template.bind({})
