import { render } from '@testing-library/react-native';

import App from '@/app/index';
import { fetchWeatherForecast } from '@/services/weather.service';

const mockFetchWeatherForecast = jest.mocked(fetchWeatherForecast);

jest.mock('@expo/vector-icons', () => ({
  Feather: () => null,
  MaterialCommunityIcons: () => null,
}));

jest.mock('@/services/weather.service', () => ({
  fetchWeatherForecast: jest.fn(),
}));

describe('<App/>', () => {
  test('App renders correctly', () => {
    mockFetchWeatherForecast.mockImplementation(
      () => new Promise(() => undefined),
    );

    render(<App />);
  });
});
