import { groupForecastByDay } from '@/screens/home-screen/utils/group-forecast-by-day';

import { getMockForecastResponse } from './utils/get-mock-forecast-response';

describe('groupForecastByDay', () => {
  test('groups forecast items by shifted local day', () => {
    const response = getMockForecastResponse();

    response.city.timezone = 2 * 60 * 60;
    response.list = [
      {
        ...response.list[0],
        dt: Math.floor(new Date('2026-03-16T22:00:00Z').getTime() / 1000),
        dt_txt: '2026-03-16 22:00:00',
      },
      {
        ...response.list[1],
        dt: Math.floor(new Date('2026-03-16T23:00:00Z').getTime() / 1000),
        dt_txt: '2026-03-16 23:00:00',
      },
      {
        ...response.list[2],
        dt: Math.floor(new Date('2026-03-17T22:00:00Z').getTime() / 1000),
        dt_txt: '2026-03-17 22:00:00',
      },
    ];
    response.cnt = response.list.length;

    const result = groupForecastByDay(response);

    expect(result).toHaveLength(2);
    expect(result[0].key).toBe('2026-03-17');
    expect(result[0].items).toHaveLength(2);
    expect(result[1].key).toBe('2026-03-18');
    expect(result[1].items).toHaveLength(1);
  });

  test('returns only the first five grouped days', () => {
    const response = getMockForecastResponse();

    const result = groupForecastByDay(response);

    expect(result).toHaveLength(5);
    expect(result.map((group) => group.key)).toEqual([
      '2026-03-16',
      '2026-03-17',
      '2026-03-18',
      '2026-03-19',
      '2026-03-20',
    ]);
  });
});
