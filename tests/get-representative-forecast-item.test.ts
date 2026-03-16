import { getRepresentativeForecastItem } from '@/screens/home-screen/utils/get-representative-forecast-item';

import { getMockForecastResponse } from './utils/get-mock-forecast-response';

describe('getRepresentativeForecastItem', () => {
  test('returns the item closest to midday', () => {
    const response = getMockForecastResponse();

    const result = getRepresentativeForecastItem(response.list.slice(0, 3), 0);

    expect(result).toEqual(response.list[1]);
  });

  test('applies the timezone offset before comparing against midday', () => {
    const response = getMockForecastResponse();
    const items = [response.list[1], response.list[0]];

    const result = getRepresentativeForecastItem(items, 3 * 60 * 60);

    expect(result).toEqual(response.list[0]);
  });
});
