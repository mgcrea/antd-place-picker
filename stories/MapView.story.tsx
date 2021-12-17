import {ComponentMeta} from '@storybook/react';
import React, {FunctionComponent} from 'react';
import {MapView, MapViewProps} from '../src/components';

import {MAPBOX_API_ACCESS_TOKEN, storybookSizeArgTypes, titlePrefix} from './utils';
export {MapView};

export const meta: ComponentMeta<typeof MapView> = {
  title: `${titlePrefix}MapView`,
  component: MapView,
  argTypes: {
    ...storybookSizeArgTypes,
    width: {type: 'number'},
    height: {type: 'number'},
  },
  args: {
    width: 320,
    height: 240,
    accessToken: MAPBOX_API_ACCESS_TOKEN,
  },
};

export default meta;

const DefaultTemplate: FunctionComponent<MapViewProps> = (props) => <MapView {...props} />;
export const Default = DefaultTemplate.bind({});

// const TypeTemplate: ComponentStory<typeof MapView> = declineTemplate(DefaultTemplate, {
//   name: 'type',
//   layout: 'horizontal',
// });
// export const Types = TypeTemplate.bind({});

// const SizeTemplate = sizeTemplate(DefaultTemplate, {
//   layout: 'horizontal',
// });
// export const Sizes = SizeTemplate.bind({});
