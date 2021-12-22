// @docs https://docs.mapbox.com/mapbox-gl-js/api/#map

import type {CameraOptions} from 'mapbox-gl';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {InteractiveMap, InteractiveMapProps, MapLoadEvent, MapRef, Marker, ViewState} from 'react-map-gl';
import {globalDefaults, mapViewDefaults} from '../config';
import {MapPin} from './MapPin';
import './style/map-view.less';

export type MapViewProps = Omit<
  InteractiveMapProps,
  'width' | 'height' | 'longitude' | 'latitude' | 'zoom' | 'locale'
> & {
  accessToken?: string;
  width?: number | string;
  height?: number | string;
  locale?: string;
  viewport?: ViewState | null;
  defaultViewport?: ViewState | null;
  flyMode?: boolean;
};

const MapViewRenderFunction: ForwardRefRenderFunction<MapRef, MapViewProps> = (
  {
    accessToken = globalDefaults.accessToken,
    locale = mapViewDefaults.locale,
    mapStyle = mapViewDefaults.mapStyle,
    defaultViewport = mapViewDefaults.defaultViewport,
    onLoad,
    viewport: propViewport,
    flyMode = true,
    width = '100%',
    height = '100%',
    ...otherProps
  },
  ref,
) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [viewport, setViewport] = useState<ViewState>(propViewport || defaultViewport!);
  const [showMapPin, setShowMapPin] = useState<boolean>(!!propViewport);
  const mapRef = useRef<MapRef>(null);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  useImperativeHandle(ref, () => mapRef.current!);

  const setLocale = useCallback(() => {
    if (!mapRef.current) {
      return;
    }
    const map = mapRef.current.getMap();
    map.setLayoutProperty('country-label', 'text-field', ['get', `name_${locale}`]);
    map.setLayoutProperty('poi-label', 'text-field', ['get', `name_${locale}`]);
    map.setLayoutProperty('settlement-label', 'text-field', ['get', `name_${locale}`]);
    map.setLayoutProperty('settlement-subdivision-label', 'text-field', ['get', `name_${locale}`]);
  }, [locale]);

  const handleLoad = useCallback(
    (event: MapLoadEvent) => {
      setLocale();
      if (onLoad) {
        onLoad(event);
      }
    },
    [onLoad, setLocale],
  );

  useEffect(() => {
    if (!mapRef.current || !propViewport) {
      return;
    }
    const map = mapRef.current.getMap();
    const {latitude, longitude, zoom} = propViewport;
    const cameraOptions: CameraOptions = {
      center: [longitude, latitude],
      zoom,
    };
    map.once('moveend', () => {
      setViewport(propViewport);
      setShowMapPin(true);
    });
    setShowMapPin(false);
    map[flyMode ? 'flyTo' : 'jumpTo'](cameraOptions);
  }, [propViewport, flyMode]);

  return (
    <InteractiveMap
      ref={mapRef}
      mapboxApiAccessToken={accessToken}
      mapStyle={mapStyle}
      onLoad={handleLoad}
      onViewportChange={setViewport}
      width={width}
      height={height}
      {...otherProps}
      {...viewport}
    >
      {showMapPin && propViewport ? (
        <Marker longitude={propViewport.longitude} latitude={propViewport.latitude}>
          <MapPin centered size={32} />
        </Marker>
      ) : null}
    </InteractiveMap>
  );
};

export const MapView = forwardRef(MapViewRenderFunction);
