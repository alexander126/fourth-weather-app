export type ForecastCoordinates = {
  lat: number;
  long: number;
};

export type OpenWeatherCoordinates = {
  lat: number;
  lon: number;
};

export type OpenWeatherForecastWeather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type OpenWeatherForecastItem = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level?: number;
    grnd_level?: number;
    humidity: number;
    temp_kf?: number;
  };
  weather: OpenWeatherForecastWeather[];
  clouds: { all: number };
  wind: { speed: number; deg: number; gust?: number };
  visibility: number;
  pop: number;
  rain?: { "3h": number };
  snow?: { "3h": number };
  sys: { pod: "d" | "n" };
  dt_txt: string;
};

export type OpenWeatherForecastCity = {
  id: number;
  name: string;
  coord: OpenWeatherCoordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

export type OpenWeatherForecastResponse = {
  cod: string;
  message: number;
  cnt: number;
  list: OpenWeatherForecastItem[];
  city: OpenWeatherForecastCity;
};
