import {ComponentMeta} from '@storybook/react';
import React, {FunctionComponent} from 'react';
import {PlacePicker, PlacePickerProps} from '../src/components';

import {MAPBOX_API_ACCESS_TOKEN, storybookSizeArgTypes, titlePrefix} from './utils';
export {PlacePicker};

export const meta: ComponentMeta<typeof PlacePicker> = {
  title: `${titlePrefix}PlacePicker`,
  component: PlacePicker,
  argTypes: {
    ...storybookSizeArgTypes,
  },
  args: {
    accessToken: MAPBOX_API_ACCESS_TOKEN,
    placeholder: 'Type an address',
  },
};

export default meta;

const DefaultTemplate: FunctionComponent<PlacePickerProps> = (props) => <PlacePicker {...props} />;
export const Default = DefaultTemplate.bind({});

// const TypeTemplate: ComponentStory<typeof PlacePicker> = declineTemplate(DefaultTemplate, {
//   name: 'type',
//   layout: 'horizontal',
// });
// export const Types = TypeTemplate.bind({});

// const SizeTemplate = sizeTemplate(DefaultTemplate, {
//   layout: 'horizontal',
// });
// export const Sizes = SizeTemplate.bind({});
