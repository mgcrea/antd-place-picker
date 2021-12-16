import type {MapViewProps, PlaceSelectProps} from 'src/components';
import {MAPBOX_API_ACCESS_TOKEN} from './env';

export const globalDefaults = {
  accessToken: MAPBOX_API_ACCESS_TOKEN || '',
};

export const placeSelectDefaults: Required<Pick<PlaceSelectProps, 'countries' | 'language' | 'proximity' | 'limit'>> = {
  countries: ['FR'],
  language: ['fr-FR'],
  proximity: [2.349014, 48.864716],
  limit: 5,
};

export const mapViewDefaults: Required<Pick<MapViewProps, 'locale' | 'mapStyle' | 'defaultViewport'>> = {
  locale: 'fr',
  mapStyle: 'mapbox://styles/mapbox/streets-v11',
  defaultViewport: {
    latitude: 48.864716,
    longitude: 2.349014,
    zoom: 10,
  },
};
