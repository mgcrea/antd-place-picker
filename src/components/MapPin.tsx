import {classNames} from 'src/utils';
import React, {FunctionComponent, SVGProps} from 'react';
import './style/map-pin.less';

const ICON_PATH = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

export type MapPinProps = SVGProps<SVGElement> & {
  centered?: boolean;
  size?: number;
};

export const MapPin: FunctionComponent<MapPinProps> = ({className, style: styleProp = {}, size = 64, centered}) => {
  const style = centered ? {...styleProp, transform: `translate(${-size / 2}px,${-size}px)`} : styleProp;
  return (
    <svg className={classNames('ant-map-pin', className)} height={size} width={size} viewBox="0 0 24 24" style={style}>
      <path d={ICON_PATH} />
      <ellipse ry="4" rx="4" cy="10" cx="12" fill="#ffffff" />
    </svg>
  );
};
