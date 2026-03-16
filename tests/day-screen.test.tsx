import { fireEvent, render } from '@testing-library/react-native';

import DayScreen from '@/screens/day-screen';
import { useLocationDataStore } from '@/store/location-data.store';

import { getMockForecastResponse } from './utils/get-mock-forecast-response';

let mockDay = '2026-03-16';
const mockBack = jest.fn();

jest.mock('expo-router', () => ({
  useLocalSearchParams: () => ({
    day: mockDay,
  }),
  useRouter: () => ({
    back: mockBack,
  }),
}));

describe('DayScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockDay = '2026-03-16';
    useLocationDataStore.getState().resetData();
  });


  test('renders the selected day breakdown', async () => {
    mockDay = '2026-03-17';
    useLocationDataStore
      .getState()
      .setSuccess(getMockForecastResponse());

    const { findByText } = render(<DayScreen />);

    await findByText('Day Breakdown');
    await findByText('Hourly Breakdown');
    await findByText('San Francisco');
    await findByText('Clouds');
    await findByText('Feels like 19°');
  });

  test('renders only the selected day hourly data', async () => {
    mockDay = '2026-03-17';
    useLocationDataStore
      .getState()
      .setSuccess(getMockForecastResponse());

    const { findByText, queryByText } = render(<DayScreen />);

    await findByText('Feels like 19°');
    await findByText('19°');

    expect(queryByText('Feels like 18°')).toBeNull();
    expect(queryByText('20°')).toBeNull();
  });

  test('navigates back when pressing the back button', async () => {
    useLocationDataStore
      .getState()
      .setSuccess(getMockForecastResponse());

    const { findByLabelText } = render(<DayScreen />);

    const backButton = await findByLabelText('Back to home');

    fireEvent.press(backButton);

    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
