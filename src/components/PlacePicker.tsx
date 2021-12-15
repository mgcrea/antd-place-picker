import {Spin} from 'antd';
import React, {FunctionComponent, HTMLProps, useCallback, useEffect, useState} from 'react';
import {ViewState} from 'react-map-gl';
import {classNames} from '../utils';
import {MapView} from './MapView';
import {PlaceSelect, PlaceSelectProps} from './PlaceSelect';
import './style/place-picker.less';

export type PlacePickerProps = Pick<HTMLProps<HTMLDivElement>, 'style' | 'className'> &
  PlaceSelectProps & {defaultCoordinates?: [number, number]; flyToZoom?: number};

export const PlacePicker: FunctionComponent<PlacePickerProps> = ({
  className,
  flyToZoom = 16,
  defaultCoordinates,
  onFeatureSelect,
  style,
  ...otherProps
}) => {
  const [viewport, setViewport] = useState<ViewState>();
  const [mapIsVisible, setMapIsVisible] = useState<boolean>(false);

  // @NOTE update map when a new feature is selected
  const handleFeatureSelect = useCallback<NonNullable<PlaceSelectProps['onFeatureSelect']>>(
    (feature) => {
      const {center} = feature;
      if (center) {
        setViewport({longitude: center[0], latitude: center[1], zoom: flyToZoom});
      }
      if (onFeatureSelect) {
        onFeatureSelect(feature);
      }
    },
    [onFeatureSelect, flyToZoom],
  );

  useEffect(() => {
    if (!defaultCoordinates || viewport) {
      return;
    }
    setViewport({longitude: defaultCoordinates[0], latitude: defaultCoordinates[1], zoom: flyToZoom});
  }, [viewport, flyToZoom, defaultCoordinates]);

  // @NOTE delay map display to ease perf
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMapIsVisible(true);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className={classNames('ant-place-picker', className)} style={style}>
      <PlaceSelect onFeatureSelect={handleFeatureSelect} limit={6} style={{width: '100%'}} {...otherProps} />
      <div className="ant-place-picker-map-view">
        {mapIsVisible ? <MapView viewport={viewport} /> : <Spin size="large" />}
      </div>
    </div>
  );
};
