import { fireEvent, render, waitFor } from '@testing-library/react-native';
import * as Location from 'expo-location';

import HomeScreen from '@/screens/home-screen';
import { fetchWeatherForecast } from '@/services/weather.service';
import { useLocationDataStore } from '@/store/location-data.store';

import { getMockForecastResponse } from './utils/get-mock-forecast-response';

const mockFetchWeatherForecast = jest.mocked(fetchWeatherForecast);
const mockGetCurrentPositionAsync = jest.mocked(Location.getCurrentPositionAsync);
const mockGetForegroundPermissionsAsync = jest.mocked(
  Location.getForegroundPermissionsAsync,
);
const mockRequestForegroundPermissionsAsync = jest.mocked(
  Location.requestForegroundPermissionsAsync,
);
const mockPush = jest.fn();

const londonCoords = {
  lat: 51.5072,
  long: -0.1276,
};

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('expo-location', () => ({
  Accuracy: {
    Balanced: 'balanced',
  },
  PermissionStatus: {
    DENIED: 'denied',
    GRANTED: 'granted',
  },
  getCurrentPositionAsync: jest.fn(),
  getForegroundPermissionsAsync: jest.fn(),
  requestForegroundPermissionsAsync: jest.fn(),
}));

jest.mock('@/services/weather.service', () => ({
  fetchWeatherForecast: jest.fn(),
}));

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useLocationDataStore.getState().resetData();
    mockGetForegroundPermissionsAsync.mockResolvedValue({
      status: Location.PermissionStatus.GRANTED,
    } as never);
    mockRequestForegroundPermissionsAsync.mockResolvedValue({
      status: Location.PermissionStatus.GRANTED,
    } as never);
    mockGetCurrentPositionAsync.mockResolvedValue({
      coords: {
        latitude: londonCoords.lat,
        longitude: londonCoords.long,
      },
    } as never);
  });

  test('renders the loading state', () => {
    mockFetchWeatherForecast.mockImplementation(
      () => new Promise(() => undefined),
    );

    const { getByText } = render(<HomeScreen />);

    getByText('Loading forecast...');
  });

  test('renders the error state', async () => {
    mockFetchWeatherForecast.mockRejectedValue(new Error('Request failed'));

    const { findByText } = render(<HomeScreen />);

    await findByText('Unable to load forecast');
    await findByText('Please try again in a moment.');
  });

  test('renders the normal state', async () => {
    mockFetchWeatherForecast.mockResolvedValue(getMockForecastResponse());

    const { findByDisplayValue, findByText } = render(<HomeScreen />);

    await findByText('San Francisco');
    await findByText('Rain');
    await findByText('5-Day Forecast');
    await findByDisplayValue('San Francisco');
  });

  test('navigates to the selected day breakdown', async () => {
    mockFetchWeatherForecast.mockResolvedValue(getMockForecastResponse());

    const { findByTestId } = render(<HomeScreen />);

    const todayForecastButton = await findByTestId('forecast-day-2026-03-16');

    fireEvent.press(todayForecastButton);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/day',
      params: { day: '2026-03-16' },
    });
  });

  test('prevents day navigation when forecast data is unavailable', async () => {
    mockFetchWeatherForecast.mockRejectedValue(new Error('Request failed'));

    const { findByText, queryByTestId } = render(<HomeScreen />);

    await findByText('Unable to load forecast');

    expect(queryByTestId('forecast-day-2026-03-16')).toBeNull();
    expect(mockPush).not.toHaveBeenCalled();
  });

  test('fetches weather for the current location when the location button is pressed', async () => {
    mockFetchWeatherForecast.mockResolvedValue(getMockForecastResponse());

    const { findByTestId } = render(<HomeScreen />);

    const locationButton = await findByTestId('use-current-location-button');

    fireEvent.press(locationButton);

    await waitFor(() => {
      expect(mockFetchWeatherForecast).toHaveBeenLastCalledWith({
        coords: londonCoords,
      });
    });
  });

  test('does not refetch San Francisco when it is already selected', async () => {
    mockFetchWeatherForecast.mockResolvedValue(getMockForecastResponse());

    const { findByTestId } = render(<HomeScreen />);

    const searchInputButton = await findByTestId('choose-forecast-city-button');

    fireEvent.press(searchInputButton);

    const sanFranciscoOption = await findByTestId('select-san-francisco-button');

    fireEvent.press(sanFranciscoOption);

    expect(mockFetchWeatherForecast).toHaveBeenCalledTimes(1);
  });

});
