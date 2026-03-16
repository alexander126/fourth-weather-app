import { getForecastLow } from '@/screens/home-screen/utils/get-forecast-low';

import { getMockForecastResponse } from './utils/get-mock-forecast-response';

describe('getForecastLow', () => {
  test('returns the lowest temp_min from the list', () => {
    const response = getMockForecastResponse();

    expect(getForecastLow(response.list.slice(0, 3))).toBe(17);
  });

  test('rounds the lowest temp_min to the nearest integer', () => {
    const response = getMockForecastResponse();

    response.list[0].main.temp_min = 6.4;
    response.list[1].main.temp_min = 3.2;
    response.list[2].main.temp_min = 3.6;

    expect(getForecastLow(response.list.slice(0, 3))).toBe(3);
  });
});
