// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0'
import React, { useState } from 'react'
import { DEFAULTS } from 'src/constants'
import OptionSelector, {
  OptionSelectorProps,
} from '../pages/CategoryDetails/OptionSelector'

export default {
  title: 'CategoryDetails/OptionSelector',
  component: OptionSelector,
  args: {
    options: DEFAULTS.SORT_OPTIONS.slice(),
    option: null,
  },
  argTypes: {
    optionIdx: {
      control: {
        type: 'range',
        min: 0,
        max: DEFAULTS.SORT_OPTIONS.length - 1,
        step: 1,
      },
    },
  },
} as Meta

const Template: Story<OptionSelectorProps> = (args) => {
  const [option, setOption] = useState(args.option)

  return <OptionSelector {...args} option={option} setOption={setOption} />
}

export const Main = Template.bind({})
