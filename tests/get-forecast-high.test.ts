import { getForecastHigh } from '@/screens/home-screen/utils/get-forecast-high';

import { getMockForecastResponse } from './utils/get-mock-forecast-response';

describe('getForecastHigh', () => {
  test('returns the highest temp_max from the list', () => {
    const response = getMockForecastResponse();

    expect(getForecastHigh(response.list.slice(0, 3))).toBe(23);
  });

  test('rounds the highest temp_max to the nearest integer', () => {
    const response = getMockForecastResponse();

    response.list[0].main.temp_max = 21.2;
    response.list[1].main.temp_max = 24.6;
    response.list[2].main.temp_max = 24.4;

    expect(getForecastHigh(response.list.slice(0, 3))).toBe(25);
  });
});
