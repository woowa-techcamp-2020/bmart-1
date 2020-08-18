// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { SORT_BY_TYPES } from 'src/constants'
import OptionSelector, { OptionSelectorProps } from '../pages/CategoryDetails/OptionSelector'

export default {
  title: 'CategoryDetails/OptionSelector',
  component: OptionSelector,
  args: {
    options: SORT_BY_TYPES.slice(),
    optionIdx: 0,
  },
  argTypes: {
    optionIdx: {
      control: { type: 'range', min: 0, max: SORT_BY_TYPES.length - 1, step: 1 },
    },
  },
} as Meta

const Template: Story<OptionSelectorProps> = (args) => <OptionSelector {...args} />

export const Main = Template.bind({})
