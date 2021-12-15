import {ComponentMeta} from '@storybook/react';
import React, {FunctionComponent} from 'react';
import {PlacePicker, PlacePickerProps} from '../src/components';

import {storybookSizeArgTypes, titlePrefix} from './utils';
export {PlacePicker};

export const meta: ComponentMeta<typeof PlacePicker> = {
  title: `${titlePrefix}PlacePicker`,
  component: PlacePicker,
  argTypes: {
    ...storybookSizeArgTypes,
  },
  args: {
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
