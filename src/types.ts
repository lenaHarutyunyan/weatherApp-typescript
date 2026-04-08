import type { ReactNode } from "react";

type Main = {
    temp: number;
    feels_like: number;
    humidity: number;
    temp_max?: number;
    temp_min?: number;
};

export interface ForecastWeather {
    cod: number
    dt: number;
    dt_txt: string;
    main: Main;
    weather: {
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
    };
};

export interface WeatherData {
    cod: string | number;
    id?: number;
    name: string;
    main: Main;
    weather: {
        description: string;
    }[];
};

export interface WeatherItem {
    dt: number;
    dt_txt: string;
    main: { temp: number };
    weather: { icon: string }[];
};

export type TempUnit = "metric" | "imperial";
export type TempUnitSymbols = "°C" | "°F";

export interface TempUnitContextType {
    tempUnit: TempUnit;
    tempUnitLabel: TempUnitSymbols;
    weatherInfoItem: (data: number | undefined) => string;
    setTempUnit: React.Dispatch<React.SetStateAction<TempUnit>>;
};

export interface Props {
    children: ReactNode;
};

export interface SelectedDayComponentProps {
    selectedDay: string | null;
    groupByDay: (list: ForecastWeather[]) => Record<string, ForecastWeather[]>;
};

export interface PageProps {
  children: ReactNode;
  title: string
};

export type getWeatherUrlInfoParams = {
    type: "weather" | "forecast",  
    tempUnit?: TempUnit,
    city?: string | undefined
    lat?: number | string | undefined
    lon?: number | string | undefined
};
