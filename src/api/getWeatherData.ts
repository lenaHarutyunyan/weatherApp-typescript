import type { forecastWeather, WeatherData } from "../types";

const API_KEY: string = "03ac09d52da80833826aa4f0a085f8d2";
const OPEN_WEATHER_MAP_LINK = "https://api.openweathermap.org/data/2.5"

export function getWeather(
  city: string = import.meta.env.VITE_PUBLIC_CITY,
  tempUnit: string = "metric"
): Promise<WeatherData> {
  return fetch(
    `${OPEN_WEATHER_MAP_LINK}/weather?q=${city}&appid=${API_KEY}&units=${tempUnit}`
  ).then((res) => res.json());
};

export function getForecast(
  city: string = import.meta.env.VITE_PUBLIC_CITY,
  tempUnit: string = "metric"
): Promise<forecastWeather> {
  return fetch(
    `${OPEN_WEATHER_MAP_LINK}/forecast?q=${city}&appid=${API_KEY}&units=${tempUnit}`
  ).then((res) => res.json());
};

type LocationResponse = {
  name: string;
};

export function getLocation(
  lat: number | string,
  lon: number | string
): Promise<LocationResponse> {
  return fetch(`${OPEN_WEATHER_MAP_LINK}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  ).then((res: Response) => res.json())
}
