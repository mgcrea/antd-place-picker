import Geocoding, {
  GeocodeFeature,
  GeocodeRequest,
  GeocodeResponse,
  GeocodeService,
} from '@mapbox/mapbox-sdk/services/geocoding';
import Select, {LabeledValue, SelectProps} from 'antd/lib/select';
import 'antd/lib/select/style/index.less';
import React, {FunctionComponent, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {globalDefaults, placeSelectDefaults} from '../config';
import {useDebounce, useIsMounted} from '../hooks';
import {classNames} from '../utils';
import './style/place-select.less';

// @NOTE GeocodeFeature['id'] does not properly resolve back a full place_name
export type PlaceSelectValue = GeocodeFeature['place_name'];
export type PlaceSelectProps = SelectProps<PlaceSelectValue> &
  Pick<GeocodeRequest, 'countries' | 'language' | 'proximity' | 'limit'> & {
    accessToken?: string;
    onFeatureSelect?: (feature: GeocodeFeature) => void;
  };

export const PlaceSelect: FunctionComponent<PlaceSelectProps> = ({
  className,
  value,
  onChange,
  onFeatureSelect,
  accessToken = globalDefaults.accessToken,
  countries = placeSelectDefaults.countries,
  language = placeSelectDefaults.language,
  proximity = placeSelectDefaults.proximity,
  limit = placeSelectDefaults.limit,
  ...otherProps
}) => {
  const [options, setOptions] = useState<LabeledValue[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const {current: geocodingService} = useRef<GeocodeService>(Geocoding({accessToken}));
  const latestFeatures = useRef<GeocodeFeature[]>([]);
  const isMounted = useIsMounted();

  const handleSelect = useCallback<NonNullable<SelectProps<PlaceSelectValue>['onSelect']>>(
    // @ts-expect-error SelectHandler<PlaceSelectValue> bug
    (value, option) => {
      const feature = latestFeatures.current.find((feature) => feature.id === value);
      if (!feature) {
        throw new Error(`Unexpected missing feature with id="${value}"`);
      }
      setIsSearching(false);
      if (onFeatureSelect) {
        onFeatureSelect(feature);
      }
      if (onChange) {
        onChange(feature.place_name, option);
      }
    },
    [onFeatureSelect, onChange],
  );

  const handleSearch = useCallback(
    async (searchValue) => {
      if (!searchValue) {
        return;
      }
      setIsSearching(true);
      const {body, statusCode} = await geocodingService
        .forwardGeocode({
          query: searchValue,
          mode: 'mapbox.places',
          countries,
          language,
          types: ['address', 'poi'],
          limit,
          proximity,
        })
        .send();
      if (statusCode !== 200) {
        console.warn(`Failed to forwardGeocode with Mapbox`, body);
        return;
      }
      const {features} = body as GeocodeResponse;
      latestFeatures.current = features;
      if (isMounted()) {
        setOptions(features.map(optionFromFeature));
      }
    },
    [geocodingService, countries, language, limit, proximity, isMounted],
  );

  // @NOTE Trigger search to re-build a valid options set when receiving a new value
  const isValidOption = useMemo<boolean>(() => options.some((option) => option.value === value), [value, options]);
  useEffect(() => {
    async function applyEffect(): Promise<void> {
      if (!value || isValidOption || isSearching) {
        return;
      }
      await handleSearch(value);
    }
    applyEffect();
  }, [value, handleSearch, isValidOption, isSearching]);

  const debouncedSearch = useDebounce(handleSearch, 500);

  return (
    <Select
      className={classNames('ant-place-select', className)}
      value={value}
      showSearch
      options={options}
      onSelect={handleSelect}
      onSearch={debouncedSearch}
      filterOption={false}
      notFoundContent={null}
      allowClear
      {...otherProps}
    />
  );
};

const optionFromFeature = (feature: GeocodeFeature): LabeledValue => ({
  label: feature.place_name,
  value: feature.id,
});
