import {ComponentMeta} from '@storybook/react';
import React, {FunctionComponent} from 'react';
import {PlaceSelect, PlaceSelectProps} from '../src/components';

import {MAPBOX_API_ACCESS_TOKEN, storybookSizeArgTypes, titlePrefix} from './utils';
export {PlaceSelect};

export const meta: ComponentMeta<typeof PlaceSelect> = {
  title: `${titlePrefix}PlaceSelect`,
  component: PlaceSelect,
  argTypes: {
    ...storybookSizeArgTypes,
  },
  args: {
    accessToken: MAPBOX_API_ACCESS_TOKEN,
    placeholder: 'Type an address',
    style: {width: 320},
  },
};

export default meta;

const DefaultTemplate: FunctionComponent<PlaceSelectProps> = (props) => <PlaceSelect {...props} />;
export const Default = DefaultTemplate.bind({});

// const TypeTemplate: ComponentStory<typeof PlaceSelect> = declineTemplate(DefaultTemplate, {
//   name: 'type',
//   layout: 'horizontal',
// });
// export const Types = TypeTemplate.bind({});

// const SizeTemplate = sizeTemplate(DefaultTemplate, {
//   layout: 'horizontal',
// });
// export const Sizes = SizeTemplate.bind({});
