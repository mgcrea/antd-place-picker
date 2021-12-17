# antd-place-picker

<p align="center">
  <a href="https://www.npmjs.com/package/@mgcrea/antd-place-picker">
    <img src="https://img.shields.io/npm/v/@mgcrea/antd-place-picker.svg?style=for-the-badge" alt="npm version" />
  </a>
  <!-- <a href="https://www.npmjs.com/package/@mgcrea/antd-place-picker">
    <img src="https://img.shields.io/npm/dt/@mgcrea/antd-place-picker.svg?style=for-the-badge" alt="npm total downloads" />
  </a> -->
  <a href="https://www.npmjs.com/package/@mgcrea/antd-place-picker">
    <img src="https://img.shields.io/npm/dm/@mgcrea/antd-place-picker.svg?style=for-the-badge" alt="npm monthly downloads" />
  </a>
  <a href="https://www.npmjs.com/package/@mgcrea/antd-place-picker">
    <img src="https://img.shields.io/npm/l/@mgcrea/antd-place-picker.svg?style=for-the-badge" alt="npm license" />
  </a>
  <a href="https://github.com/mgcrea/antd-place-picker/actions/workflows/main.yml">
    <img src="https://img.shields.io/github/workflow/status/mgcrea/antd-place-picker/main?style=for-the-badge" alt="github main workflow" />
  </a>
</p>

## Features

- Provides a `<PlacePicker />` powered-by [AntDesign](https://ant.design/) `<Select />` leveraging [react-map-gl](https://github.com/visgl/react-map-gl)
- Written from the ground up with [TypeScript](https://www.typescriptlang.org/)

## Docs

- [Storybook](https://mgcrea.github.io/antd-place-picker)

## Install

```sh
npm install @mgcrea/antd-place-picker
```

## Quickstart

```tsx
import React from 'react';
import {Form, FormProps} from 'antd';
import {PlacePicker} from '@mgcrea/antd-place-picker';
import '@mgcrea/antd-place-picker/lib/esm/style.less';

function App() {
  const onSubmit = (data) => console.log(data);

  return (
    <Form labelCol={{span: 4}} wrapperCol={{span: 14}} layout="horizontal" onSubmit={onSubmit}>
      <Form.Item name="place">
        <PlacePicker />
      </Form.Item>
    </Form>
  );
}
```
