// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0'
import React, { useState } from 'react'
import MinusPlus, { MinusPlusProps } from 'src/components/MinusPlus'

export default {
  title: 'CartPage/MinusPlus',
  component: MinusPlus,
  args: {
    quantity: 1,
  },
} as Meta

const Template: Story<MinusPlusProps> = (args) => {
  const [quantity, onChange] = useState(args.quantity)

  return <MinusPlus {...{ quantity, onChange }}></MinusPlus>
}

export const BaseLogo = Template.bind({})
