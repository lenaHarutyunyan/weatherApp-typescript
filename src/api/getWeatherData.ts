import type { ForecastWeather, getWeatherUrlInfoParams, WeatherData } from "../types";
import getWeatherUrlInfo from "./getWeatherUrlInfo";

type TempUnit = "metric" | "imperial";

type LocationResponse = {
  name: string;
};

export function getForecast(
  city: string,
  tempUnit: TempUnit = "metric"
): Promise<ForecastWeather> {
  return getWeatherUrlInfo({ tempUnit, city, type: "forecast" } as getWeatherUrlInfoParams);
};

export function getLocation(
  lat: number | string,
  lon: number | string
): Promise<LocationResponse> {
  return getWeatherUrlInfo({ lat, lon, type: "weather" } as getWeatherUrlInfoParams);
};

export function getWeather(
  city: string,
  tempUnit: TempUnit = "metric"
): Promise<WeatherData> {
  return getWeatherUrlInfo({ tempUnit, city, type: "weather" } as getWeatherUrlInfoParams);
};
