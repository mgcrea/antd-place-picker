/* eslint-disable @typescript-eslint/no-explicit-any */
import {useArgs} from '@storybook/addons';
import {ArgTypes, ComponentStory} from '@storybook/react';
import React, {
  ComponentProps,
  createElement,
  FunctionComponent,
  JSXElementConstructor,
  useEffect,
  useState,
} from 'react';
import {Label, StoryContainer, StoryContainerProps} from './components';
import {storybookSizeOptions} from './size';

type LocalStateOptions = {
  valueExtractor?: (...args: any[]) => any;
  argValueInjector?: (...args: any[]) => any;
  argValueExtractor?: (...args: any[]) => any;
  labelExtractor?: (...args: any[]) => string;
  valuePropName?: string;
  trigger?: string;
};

export function withLocalState<T extends JSXElementConstructor<P>, P extends {[s: string]: any}>(
  story: ComponentStory<T>,
  options: LocalStateOptions = {},
) {
  const {
    valueExtractor,
    argValueInjector,
    argValueExtractor,
    labelExtractor,
    valuePropName = 'value',
    trigger = 'onChange',
  } = options;
  const WrappedStory: ComponentStory<T> = (props, _context) => {
    const {[valuePropName]: valueProp, [trigger]: onChangeProp, ...otherProps} = props;
    const [_args, updateArgs] = useArgs();
    const [value, setValue] = useState<any>(argValueInjector ? argValueInjector(valueProp) : valueProp);
    const onChange: (...args: any[]) => any = (...args) => {
      const value = valueExtractor ? valueExtractor(...args) : args[0];
      typeof valueProp !== 'undefined'
        ? updateArgs({[valuePropName]: argValueExtractor ? argValueExtractor(value) : value})
        : setValue(value);
      onChangeProp && onChangeProp(...args);
    };
    useEffect(() => {
      if (typeof valueProp !== 'undefined') {
        setValue(argValueInjector ? argValueInjector(valueProp) : valueProp);
      }
    }, [valueProp]);

    return (
      <div style={{textAlign: 'center'}}>
        {createElement(story, {[trigger]: onChange, [valuePropName]: value, ...otherProps} as ComponentProps<T>)}
        <div style={{textAlign: 'center'}}>
          <small>
            {valuePropName}={labelExtractor ? labelExtractor(value) : String(value)}
          </small>
        </div>
      </div>
    );
  };

  return WrappedStory;
}

type DeclineTemplateOptions = StoryContainerProps & {
  name: string;
  options: any[];
  extraProps?: {[s: string]: any};
};
export function declineTemplate<T extends JSXElementConstructor<P>, P extends {[s: string]: any}>(
  template: ComponentStory<T>,
  {name, options, extraProps, ...otherProps}: DeclineTemplateOptions,
) {
  const WrappedStory: ComponentStory<T> = (props, context) => {
    return (
      <StoryContainer {...otherProps}>
        {options.map((value) => {
          return (
            <div key={`${value}`}>
              <Label name={name} value={value} />
              {template({...props, ...extraProps, [name]: value}, context)}
            </div>
          );
        })}
      </StoryContainer>
    );
  };
  WrappedStory.argTypes = {[name]: {control: {type: null}}} as unknown as Partial<ArgTypes<ComponentProps<T>>>;
  return WrappedStory;
}

export function sizeTemplate<T extends JSXElementConstructor<P>, P extends {[s: string]: any}>(
  template: ComponentStory<T>,
  otherProps: Omit<DeclineTemplateOptions, 'name' | 'options'> = {},
) {
  return declineTemplate<T, P>(template, {...otherProps, name: 'size', options: storybookSizeOptions});
}
