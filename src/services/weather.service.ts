import type {
  ForecastCoordinates,
  OpenWeatherForecastResponse,
} from "@/typescript/weather";

export async function fetchWeatherForecast({
  coords,
}: {
  coords: ForecastCoordinates;
}): Promise<OpenWeatherForecastResponse> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;

  if (!apiUrl) {
    throw new Error("Missing EXPO_PUBLIC_API_URL");
  }

  if (!apiKey) {
    throw new Error("Missing EXPO_PUBLIC_API_KEY");
  }

  const response = await fetch(
    `${apiUrl}?lat=${coords.lat}&lon=${coords.long}&appid=${encodeURIComponent(apiKey)}&units=metric`,
  );

  if (!response.ok) {
    throw new Error(`Forecast request failed with status ${response.status}`);
  }

  const data: OpenWeatherForecastResponse = await response.json();
  return data;
}
