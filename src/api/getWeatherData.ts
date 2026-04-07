import type { forecastWeather, WeatherData } from "../types";

const API_KEY: string = "03ac09d52da80833826aa4f0a085f8d2";
const OPEN_WEATHER_MAP_LINK = "https://api.openweathermap.org/data/2.5";
type TempUnit = "metric" | "imperial";

export function getWeather(
  city: string = import.meta.env.VITE_PUBLIC_CITY,
  tempUnit: TempUnit = "metric"
): Promise<WeatherData> {
  return fetch(
    `${OPEN_WEATHER_MAP_LINK}/weather?appid=${API_KEY}&q=${city}&units=${tempUnit}`
  ).then((res) => res.json());
};

export function getForecast(
  city: string = import.meta.env.VITE_PUBLIC_CITY,
  tempUnit: TempUnit = "metric"
): Promise<forecastWeather> {
  return fetch(
    `${OPEN_WEATHER_MAP_LINK}/forecast?appid=${API_KEY}&q=${city}&units=${tempUnit}`).then((res) => res.json());
};

type LocationResponse = {
  name: string;
};

export function getLocation(
  lat: number | string,
  lon: number | string
): Promise<LocationResponse> {
  return fetch(
    `${OPEN_WEATHER_MAP_LINK}/weather?appid=${API_KEY}&lat=${lat}&lon=${lon}`).then((res: Response) => res.json())
}
