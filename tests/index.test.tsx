import { render } from '@testing-library/react-native';

import App from '@/app/index';
import { fetchWeatherForecast } from '@/services/weather.service';

const mockFetchWeatherForecast = jest.mocked(fetchWeatherForecast);
const mockPush = jest.fn();

jest.mock('@expo/vector-icons', () => ({
  Feather: () => null,
  MaterialCommunityIcons: () => null,
}));

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

describe('<App/>', () => {
  test('App renders correctly', () => {
    mockFetchWeatherForecast.mockImplementation(
      () => new Promise(() => undefined),
    );

    render(<App />);
  });
});
