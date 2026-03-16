import { SAN_FRANCISCO_COORDS } from '@/config/consts';
import { useLocationDataStore } from '@/store/location-data.store';

import { getMockForecastResponse } from './utils/get-mock-forecast-response';

describe('useLocationDataStore', () => {
  beforeEach(() => {
    useLocationDataStore.getState().resetData();
  });

  test('starts with the initial state and resets back to it', () => {
    useLocationDataStore.getState().setLoading(false);
    useLocationDataStore
      .getState()
      .setSuccess({
        coords: SAN_FRANCISCO_COORDS,
        data: getMockForecastResponse(),
      });

    useLocationDataStore.getState().resetData();

    expect(useLocationDataStore.getState()).toMatchObject({
      coords: null,
      data: null,
      error: null,
      loading: true,
    });
  });

  test('stores fetched data with the success action', () => {
    const response = getMockForecastResponse();

    useLocationDataStore.getState().setSuccess({
      coords: SAN_FRANCISCO_COORDS,
      data: response,
    });

    expect(useLocationDataStore.getState()).toMatchObject({
      coords: SAN_FRANCISCO_COORDS,
      data: response,
      error: null,
      loading: false,
    });
  });

  test('stores the failure state and clears stale data', () => {
    useLocationDataStore
      .getState()
      .setSuccess({
        coords: SAN_FRANCISCO_COORDS,
        data: getMockForecastResponse(),
      });

    useLocationDataStore.getState().setFailure('Please try again in a moment.');

    expect(useLocationDataStore.getState()).toMatchObject({
      coords: null,
      data: null,
      error: 'Please try again in a moment.',
      loading: false,
    });
  });

  test('updates loading independently', () => {
    useLocationDataStore.getState().setLoading(false);
    expect(useLocationDataStore.getState().loading).toBe(false);

    useLocationDataStore.getState().setLoading(true);
    expect(useLocationDataStore.getState().loading).toBe(true);
  });
});
