import React, {CSSProperties, FunctionComponent, HTMLProps} from 'react';

export type StoryContainerProps = HTMLProps<HTMLDivElement> & {layout?: 'horizontal' | 'vertical'};

export const StoryContainer: FunctionComponent<StoryContainerProps> = ({
  children,
  layout = 'vertical',
  style: styleProp,
  ...otherProps
}) => {
  const defaultStyles = {
    display: 'flex',
    alignItems: 'center',
    flex: '1 1 auto',
    flexDirection: 'column',
    height: '100%',
  };
  const style: CSSProperties = {
    ...defaultStyles,
    ...(layout === 'horizontal'
      ? {flexDirection: 'row', width: '100%', justifyContent: 'space-evenly'}
      : {
          flexDirection: 'column',
          height: '100%',
          maxWidth: '50%',
          margin: '0 auto',
          justifyContent: 'space-evenly',
        }),
    ...styleProp,
  };
  return (
    <div style={style} {...otherProps}>
      {children}
    </div>
  );
};
