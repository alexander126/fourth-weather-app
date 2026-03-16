import { fireEvent, render } from '@testing-library/react-native';

import HomeScreen from '@/screens/home-screen';
import { fetchWeatherForecast } from '@/services/weather.service';
import { useLocationDataStore } from '@/store/location-data.store';

import { getMockForecastResponse } from './utils/get-mock-forecast-response';

const mockFetchWeatherForecast = jest.mocked(fetchWeatherForecast);
const mockPush = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('@/services/weather.service', () => ({
  fetchWeatherForecast: jest.fn(),
}));

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useLocationDataStore.getState().resetData();
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

    const { findByText, getByPlaceholderText } = render(<HomeScreen />);

    await findByText('San Francisco');
    await findByText('Rain');
    await findByText('5-Day Forecast');
    getByPlaceholderText('Search for a city...');
  });

  test('navigates to the selected day breakdown', async () => {
    mockFetchWeatherForecast.mockResolvedValue(getMockForecastResponse());

    const { findByLabelText } = render(<HomeScreen />);

    const todayForecastButton = await findByLabelText('Today forecast');

    fireEvent.press(todayForecastButton);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/day',
      params: { day: '2026-03-16' },
    });
  });

  test('prevents day navigation when forecast data is unavailable', async () => {
    mockFetchWeatherForecast.mockRejectedValue(new Error('Request failed'));

    const { findByText, queryByLabelText } = render(<HomeScreen />);

    await findByText('Unable to load forecast');

    expect(queryByLabelText('Today forecast')).toBeNull();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
