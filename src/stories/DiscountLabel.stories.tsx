import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import DiscountLabel, {
  DiscountLabelProps,
} from '../components/icons/DiscountLabel'

export default {
  title: 'DiscountLabel',
  component: DiscountLabel,
} as Meta

const Template: Story<DiscountLabelProps> = (args) => (
  <DiscountLabel {...args} />
)

export const DiscountLabelTest = Template.bind({})
