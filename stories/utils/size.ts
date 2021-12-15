import {SizeType as AntdSizeType} from 'antd/lib/config-provider/SizeContext';
import {classNames} from './classNames';

export type SizeType = AntdSizeType | 'medium' | 'x-small' | 'x-large' | 'xx-large';

type SizeProps = {
  className?: string;
  size?: SizeType;
};

type AntdSizeProps = {className?: string; size?: AntdSizeType};

export const applySizeProps = (prefix: string, {className, size}: SizeProps): AntdSizeProps => {
  switch (size) {
    // @Note do not duplicate existing ant-design classes
    case 'small':
    case 'large':
      return {className, size};
    case 'x-small':
    case 'x-large':
    case 'xx-large':
    case 'medium':
      return applySizeClassNames(prefix, {className, size});
    default:
      return {className};
  }
};

export const applySizeClassNames = (prefix: string, {className, size}: SizeProps): AntdSizeProps => {
  switch (size) {
    case 'x-small':
      return {className: classNames(className, `${prefix}-xs`)};
    case 'x-large':
      return {className: classNames(className, `${prefix}-xl`)};
    case 'xx-large':
      return {className: classNames(className, `${prefix}-xxl`)};
    case 'small':
      return {className: classNames(className, `${prefix}-sm`)};
    case 'large':
      return {className: classNames(className, `${prefix}-lg`)};
    case 'medium':
    default:
      return {className: classNames(className, `${prefix}-md`)};
  }
};

export const storybookSizeOptions: SizeType[] = ['x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];

export const storybookSizeArgTypes = {
  size: {
    options: storybookSizeOptions,
    control: {
      type: 'inline-radio',
    },
  },
};
