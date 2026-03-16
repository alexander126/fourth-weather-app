import { getForecastVisual } from '@/screens/home-screen/utils/get-forecast-visual';

import { getMockForecastResponse } from './utils/get-mock-forecast-response';

describe('getForecastVisual', () => {
  test('returns the cloudy fallback when weather is missing', () => {
    const response = getMockForecastResponse();
    response.list[0].weather = [];

    expect(getForecastVisual(response.list[0])).toEqual({
      icon: 'weather-cloudy',
      iconTone: 'iconCloud',
    });
  });

  test('maps clear and partly cloudy variants by day and night', () => {
    const response = getMockForecastResponse();

    response.list[0].weather = [
      { description: 'clear sky', icon: '01d', id: 800, main: 'Clear' },
    ];
    expect(getForecastVisual(response.list[0])).toEqual({
      icon: 'weather-sunny',
      iconTone: 'iconSun',
    });

    response.list[0].weather = [
      { description: 'clear sky', icon: '01n', id: 800, main: 'Clear' },
    ];
    expect(getForecastVisual(response.list[0])).toEqual({
      icon: 'weather-night',
      iconTone: 'iconNight',
    });

    response.list[0].weather = [
      { description: 'scattered clouds', icon: '03d', id: 802, main: 'Clouds' },
    ];
    expect(getForecastVisual(response.list[0])).toEqual({
      icon: 'weather-partly-cloudy',
      iconTone: 'iconCloudSoft',
    });

    response.list[0].weather = [
      { description: 'scattered clouds', icon: '03n', id: 802, main: 'Clouds' },
    ];
    expect(getForecastVisual(response.list[0])).toEqual({
      icon: 'weather-night-partly-cloudy',
      iconTone: 'iconNight',
    });
  });

  test('maps thunderstorm and rain intensity branches', () => {
    const response = getMockForecastResponse();

    response.list[0].weather = [
      { description: 'thunderstorm', icon: '11d', id: 201, main: 'Thunderstorm' },
    ];
    expect(getForecastVisual(response.list[0])).toEqual({
      icon: 'weather-lightning-rainy',
      iconTone: 'iconRainStrong',
    });

    response.list[0].weather = [
      { description: 'light rain', icon: '10d', id: 500, main: 'Rain' },
    ];
    expect(getForecastVisual(response.list[0])).toEqual({
      icon: 'weather-rainy',
      iconTone: 'iconRain',
    });

    response.list[0].weather = [
      { description: 'heavy rain', icon: '10d', id: 502, main: 'Rain' },
    ];
    expect(getForecastVisual(response.list[0])).toEqual({
      icon: 'weather-pouring',
      iconTone: 'iconRainStrong',
    });
  });

  test('maps snow, fog, and overcast clouds', () => {
    const response = getMockForecastResponse();

    response.list[0].weather = [
      { description: 'snow', icon: '13d', id: 601, main: 'Snow' },
    ];
    expect(getForecastVisual(response.list[0])).toEqual({
      icon: 'weather-snowy',
      iconTone: 'iconCloudSoft',
    });

    response.list[0].weather = [
      { description: 'mist', icon: '50d', id: 741, main: 'Mist' },
    ];
    expect(getForecastVisual(response.list[0])).toEqual({
      icon: 'weather-fog',
      iconTone: 'iconCloud',
    });

    response.list[0].weather = [
      { description: 'overcast clouds', icon: '04d', id: 804, main: 'Clouds' },
    ];
    expect(getForecastVisual(response.list[0])).toEqual({
      icon: 'weather-cloudy',
      iconTone: 'iconCloud',
    });
  });
});
