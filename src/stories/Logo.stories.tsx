// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import FullNameLogoAlt, {
  FullNameLogoAltProps,
} from '../components/icons/FullNameLogoAlt'

export default {
  title: 'Example/Logo',
  component: FullNameLogoAlt,
} as Meta

const Template: Story<FullNameLogoAltProps> = (args) => (
  <FullNameLogoAlt {...args} />
)

export const BaseLogo = Template.bind({})
