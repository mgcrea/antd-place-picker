import {ComponentMeta} from '@storybook/react';
import React, {FunctionComponent} from 'react';
import {MapPin, MapPinProps} from '../src/components';

import {storybookSizeArgTypes, titlePrefix} from './utils';
export {MapPin};

export const meta: ComponentMeta<typeof MapPin> = {
  title: `${titlePrefix}MapPin`,
  component: MapPin,
  argTypes: {
    ...storybookSizeArgTypes,
  },
  args: {},
};

export default meta;

const DefaultTemplate: FunctionComponent<MapPinProps> = (props) => <MapPin {...props} />;
export const Default = DefaultTemplate.bind({});

// const TypeTemplate: ComponentStory<typeof MapPin> = declineTemplate(DefaultTemplate, {
//   name: 'type',
//   layout: 'horizontal',
// });
// export const Types = TypeTemplate.bind({});

// const SizeTemplate = sizeTemplate(DefaultTemplate, {
//   layout: 'horizontal',
// });
// export const Sizes = SizeTemplate.bind({});
