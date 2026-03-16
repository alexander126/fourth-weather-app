import { render } from '@testing-library/react-native';

import HomeScreen from '@/screens/home-screen';
import { fetchWeatherForecast } from '@/services/weather.service';

import { getMockForecastResponse } from './utils/get-mock-forecast-response';

const mockFetchWeatherForecast = jest.mocked(fetchWeatherForecast);

jest.mock('@/services/weather.service', () => ({
  fetchWeatherForecast: jest.fn(),
}));

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
});
